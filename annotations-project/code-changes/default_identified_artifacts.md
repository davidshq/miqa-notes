## Changes to ScanDecision
The function `default_identified_artifacts` in `ScanDecision` (`models/scan_decisions.py`) is being removed and replaced by:
1. Returning an empty array/object
2. Returning the current project's associated artifacts.

The code removed is in several sections:

```py
artifacts = [
    'normal_variants',
    'lesions',
    'full_brain_coverage',
    'misalignment',
    'swap_wraparound',
    'ghosting_motion',
    'inhomogeneity',
    'susceptibility_metal',
    'flow_artifact',
    'truncation_artifact',
]
```

```py
def default_identified_artifacts():
    return {
        (
            artifact_name if artifact_name != 'full_brain_coverage' else 'partial_brain_coverage'
        ): ArtifactState.UNDEFINED.value
        for artifact_name in artifacts
        if artifact_name != 'normal_variants'
    }
```

```py
# This has been changed from:
user_identified_artifacts = models.JSONField(default=default_identified_artifacts)

# To this: 
user_identified_artifacts = models.JSONField(default=dict)
```


This has been replaced (when a project is selected) with the `artifacts` method on `Project` (`models/Project.py`):
```py
@property
def artifacts(self) -> dict:
    """Gets the list of artifacts associated with the project"""
    if self.artifact_group:
        artifacts = Setting.objects.filter(group__id=self.artifact_group_id)
        return {
            artifact_name.name: ArtifactState.UNDEFINED.value
            for artifact_name in artifacts
        }
    else:
        return {}
```

And this:
```py
 for artifact_name in default_identified_artifacts().keys()
 # with:
 for artifact_name in scan.experiment.project.artifacts
```

Note that this removes two aspects:
1. When an artifact with the value `full_brain_coverage` was handled it was changed to `partial_brain_coverage`
2. Artifacts with the name `normal_variants` where not passed.

Per [Zach's suggestion](https://github.com/OpenImaging/miqa/pull/574#discussion_r956335099) the handling of the artifacts list will be handled in the client rather than the backend. This client implementation still needs to occur!

## Changes to DRF Other Endpoints
- Remove import of `default_identified_artifacts`
- Update:
```py
# This:
'artifact_options': [key for key in default_identified_artifacts()],

# To this:
'artifact_options': [],
```

## Returning Current Project's Associated Artifacts
- Adds `'artifacts'` to `fields` in DRF `project.py`.
    - Note: Also had `artifacts_group` but unsure this is actually needed?
- Adds `get_artifacts` function to act as serializer for `artifacts` field.

## Changes to tasks.py
- Removes `default_identified_artifacts` import, instead uses `project_object.artifacts`

## Migrations
- Modify `0023_user_identified_artifacts.py` to remove `default_identified_artifacts` and replace with `dict` so that Django doesn't get confused during migrations.
- Add `0036_add_setting_alter_project.py` to take care of changes for Setting model support.