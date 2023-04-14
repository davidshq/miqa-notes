Minor changes are made to support dynamic learning models.

## tasks.py
- Addition of logging.
- Import `miqa.learning.evaluation_models` at top level instead of within `evaluate_frame_content` and `evaluate_data`
- We update (2 locations):
```py
# This:
eval_model_name = frame.scan.experiment.project.evaluation_models[[frame.scan.scan_type][0]]
# To this:
eval_model_name = frame.scan.experiment.project.model_source_type_mappings[frame.scan.scan_type]
```
- And:
```py
# This:
eval_model = available_evaluation_models[eval_model_name].load()
# To this:
eval_model = eval_model_nn.load()
```
- And:
```py
# This
current_model = available_evaluation_models[model_name].load()
# To this:
eval_model_file = project.model_mappings[model_name]
# Get the predictions associated with the model
eval_model_predictions = [
        prediction_mapping
        for prediction_mapping in project.model_predictions[model_name]
]
# Load the appropriate NNModel
eval_model_nn = NNModel(eval_model_file, eval_model_predictions)
current_model = eval_model_nn.load()
```