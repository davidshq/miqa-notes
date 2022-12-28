from datetime import datetime
from io import StringIO
import json
from pathlib import Path
import tempfile
from typing import Dict, List, Optional
import logging

import boto3
from celery import shared_task
import dateparser
from django.conf import settings
from django.contrib.auth.models import User
import pandas
from rest_framework.exceptions import APIException
from miqa.learning.evaluation_models import NNModel

from miqa.core.conversion.import_export_csvs import (
    import_dataframe_to_dict,
    validate_import_dict,
)
from miqa.core.conversion.nifti_to_zarr_ngff import nifti_to_zarr_ngff
from miqa.core.models import (
    Evaluation,
    Experiment,
    Frame,
    GlobalSettings,
    Project,
    Scan,
    ScanDecision,
)
from miqa.core.models.frame import StorageMode
from miqa.core.models.scan_decision import DECISION_CHOICES

# Code that isn't related to importing/ML has been removed to
# make how the code operates simpler to understand.
# Along the same lines, code relating to S3 support has also been removed.

@shared_task
def evaluate_frame_content(frame_id):
    from miqa.learning.nn_inference import evaluate1

    logging.debug(f'Frame Id: {frame_id}')
    frame = Frame.objects.get(id=frame_id)
    logging.debug(f'Frame: {frame}')

    # Get the model that matches the frame's file type
    logging.debug(f'Eval Model Type Mappings: {frame.scan.experiment.project.model_source_type_mappings}')
    eval_model_name = frame.scan.experiment.project.model_source_type_mappings[frame.scan.scan_type]
    logging.debug(f'Eval Model Name: {eval_model_name}')

    # Get the PyTorch model file name
    eval_model_file = frame.scan.experiment.project.model_mappings[eval_model_name]
    logging.debug(f'Eval Model File: {eval_model_file}')

    # Get the Predictions associated with the model
    eval_model_predictions = [
        prediction_mapping
        for prediction_mapping in frame.scan.experiment.project.model_predictions[eval_model_name]
    ]
    logging.debug(f'All Eval Model Predictions: {eval_model_predictions}')

    # instantiate the model
    eval_model_nn = NNModel(eval_model_file, eval_model_predictions)

    # load the model
    eval_model = eval_model_nn.load()

    with tempfile.TemporaryDirectory() as tmpdirname:
        # need to send a local version to NN
        if frame.storage_mode == StorageMode.LOCAL_PATH:
            dest = Path(frame.raw_path)
        else:
            dest = Path(tmpdirname, frame.content.name.split('/')[-1])
            with open(dest, 'wb') as fd:
                fd.write(frame.content.open().read())
        result = evaluate1(eval_model, dest)

        Evaluation.objects.create(
            frame=frame,
            evaluation_model=eval_model_name,
            results=result,
        )


@shared_task
def evaluate_data(frames_by_project):
    from miqa.learning.nn_inference import evaluate_many

    # Empty dictionary
    model_to_frames_map = {}
    # Iterate through the project and its associated frames
    for project_id, frame_ids in frames_by_project.items():
        # Get the project
        project = Project.objects.get(id=project_id)
        # for each frame
        for frame_id in frame_ids:
            # get the frame
            frame = Frame.objects.get(id=frame_id)
            file_path = frame.raw_path
            # If the file doesn't exist
            if Path(file_path).exists():
                # Get the model that matches the frame's file type
                logging.warning(f'Eval Model Type Mappings: {project.model_source_type_mappings}')
                eval_model_name = project.model_source_type_mappings[frame.scan.scan_type]
                # We need the the key's (eval_model_name) value to be a list
                if eval_model_name not in model_to_frames_map:
                    model_to_frames_map[eval_model_name] = []
                # Add the frame to the list for the eval_model_name value.
                model_to_frames_map[eval_model_name].append(frame)
                # So we could end up with:
                # model_to_frames_map = {
                #   eval_model_name: [frame, frame, frame]
                # }

    with tempfile.TemporaryDirectory() as tmpdirname:
        tmpdir = Path(tmpdirname)
        # model_name = eval_model_name, frame_set = list value for key eval_model_name
        for model_name, frame_set in model_to_frames_map.items():
            # Get the PyTorch model file name
            eval_model_file = project.model_mappings[model_name]
            # Get the predictions associated with the model
            eval_model_predictions = [
                prediction_mapping
                for prediction_mapping in project.model_predictions[model_name]
            ]
            # Load the appropriate NNModel
            eval_model_nn = NNModel(eval_model_file, eval_model_predictions)
            current_model = eval_model_nn.load()
            
            file_paths = {frame: frame.raw_path for frame in frame_set}
            results = evaluate_many(current_model, list(file_paths.values()))

            Evaluation.objects.bulk_create(
                [
                    Evaluation(
                        frame=frame,
                        evaluation_model=model_name,
                        results=results[file_paths[frame]],
                    )
                    for frame in frame_set
                ]
            )


def import_data(project_id: Optional[str]):
    if project_id is None:
        project = None
        import_path = GlobalSettings.load().import_path
    else:
        project = Project.objects.get(id=project_id)
        import_path = project.import_path

    try:
        if import_path.endswith('.csv'):
            with open(import_path) as fd:
                buf = fd.read()
            import_dict = import_dataframe_to_dict(
                pandas.read_csv(StringIO(buf), index_col=False, na_filter=False).astype(str),
                project,
            )
        elif import_path.endswith('.json'):
            with open(import_path) as fd:
                import_dict = json.load(fd)
        else:
            raise APIException(f'Invalid import file {import_path}. Must be CSV or JSON.')
    except (FileNotFoundError, boto3.exceptions.Boto3Error):
        raise APIException(f'Could not locate import file at {import_path}.')
    except PermissionError:
        raise APIException(f'MIQA lacks permission to read {import_path}.')

    import_dict, not_found_errors = validate_import_dict(import_dict, project)
    perform_import(import_dict)
    return not_found_errors


@shared_task
def perform_import(import_dict):
    new_projects: List[Project] = []
    new_experiments: List[Experiment] = []
    new_scans: List[Scan] = []
    new_frames: List[Frame] = []
    new_scan_decisions: List[ScanDecision] = []

    for project_name, project_data in import_dict['projects'].items():
        try:
            project_object = Project.objects.get(name=project_name)
        except Project.DoesNotExist:
            raise APIException(f'Project {project_name} does not exist.')

        # delete old imports of these projects
        Experiment.objects.filter(
            project=project_object
        ).delete()  # cascades to scans -> frames, scan_notes

        for experiment_name, experiment_data in project_data['experiments'].items():
            notes = experiment_data.get('notes', '')
            experiment_object = Experiment(
                name=experiment_name,
                project=project_object,
                note=notes,
            )
            new_experiments.append(experiment_object)

            for scan_name, scan_data in experiment_data['scans'].items():
                subject_id = scan_data.get('subject_id', None)
                session_id = scan_data.get('session_id', None)
                scan_link = scan_data.get('scan_link', None)
                scan_object = Scan(
                    name=scan_name,
                    scan_type=scan_data['type'],
                    experiment=experiment_object,
                    subject_id=subject_id,
                    session_id=session_id,
                    scan_link=scan_link,
                )
                if 'last_decision' in scan_data and scan_data['last_decision']:
                    scan_data['decisions'] = [scan_data['last_decision']]
                for decision_data in scan_data.get('decisions', []):
                    try:
                        creator = User.objects.get(email=decision_data.get('creator', ''))
                    except User.DoesNotExist:
                        creator = None
                    note = ''
                    created = (
                        datetime.now().strftime('%Y-%m-%d %H:%M')
                        if settings.REPLACE_NULL_CREATION_DATETIMES
                        else None
                    )
                    location = {}
                    note = decision_data.get('note', '')
                    if decision_data['created']:
                        valid_dt = dateparser.parse(decision_data['created'])
                        if valid_dt:
                            created = valid_dt.strftime('%Y-%m-%d %H:%M')
                    if decision_data['location'] and decision_data['location'] != '':
                        slices = [
                            axis.split('=')[1] for axis in decision_data['location'].split(';')
                        ]
                        location = {
                            'i': slices[0],
                            'j': slices[1],
                            'k': slices[2],
                        }
                    if decision_data['decision'] in [dec[0] for dec in DECISION_CHOICES]:
                        decision = ScanDecision(
                            decision=decision_data['decision'],
                            creator=creator,
                            created=created,
                            note=note or '',
                            user_identified_artifacts={
                                artifact_name: (
                                    1
                                    if decision_data['user_identified_artifacts']
                                    and artifact_name in decision_data['user_identified_artifacts']
                                    else 0
                                )
                                for artifact_name in project_object.artifacts
                            },
                            location=location,
                            scan=scan_object,
                        )
                        new_scan_decisions.append(decision)
                new_scans.append(scan_object)
                for frame_number, frame_data in scan_data['frames'].items():

                    if frame_data['file_location']:
                        frame_object = Frame(
                            frame_number=frame_number,
                            raw_path=frame_data['file_location'],
                            scan=scan_object,
                        )
                        new_frames.append(frame_object)
                        if settings.ZARR_SUPPORT and Path(frame_object.raw_path).exists():
                            nifti_to_zarr_ngff.delay(frame_data['file_location'])

    # if any scan has no frames, it should not be created
    new_scans = [
        new_scan
        for new_scan in new_scans
        if any(new_frame.scan == new_scan for new_frame in new_frames)
    ]
    # if any experiment has no scans, it should not be created
    new_experiments = [
        new_experiment
        for new_experiment in new_experiments
        if any(new_scan.experiment == new_experiment for new_scan in new_scans)
    ]

    Project.objects.bulk_create(new_projects)
    Experiment.objects.bulk_create(new_experiments)
    Scan.objects.bulk_create(new_scans)
    Frame.objects.bulk_create(new_frames)
    ScanDecision.objects.bulk_create(new_scan_decisions)

    # must use str, not UUID, to get sent to celery task properly
    frames_by_project: Dict[str, List[str]] = {}
    for frame in new_frames:
        project_id = str(frame.scan.experiment.project.id)
        if project_id not in frames_by_project:
            frames_by_project[project_id] = []
        frames_by_project[project_id].append(str(frame.id))
    evaluate_data.delay(frames_by_project)
