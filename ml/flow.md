# High Level
- When a scan is uploaded to MIQA it is placed in a Celery task queue to await analysis.
    - All MIQA tasks can be found in `tasks.py`. We care about two in the context of ML: 
        - `evaluate_frame_content()` and `evaluate_data()`
            - These two are similar, `evaluate_frame_content()` supports a single frame while `evaluate_data()` supports many frames.
- Since the process is similar, we will focus on `evaluate_frame_content`
    - It uses `learning/evaluation_models.py`'s `NNModel()` and `NNModel.load()` to load the ML model that will be used in the analysis.
- `NNModel.load()` kicks off a call to `learning/nn_inference.py`'s `get_model()`.
- There are three main steps taken in `get_model()`:
    1. We instantiate `model` as an instance of `TiledClassifier()`.
    2. We use the `model.load_state_dict()` to load the model.
    3. We set the `model.to()` attribute so it knows where to perform the analysis (e.g. CPU/GPU).
- When the previous steps have been completed our `model` instance is passed back to `evaluate_frame_content()` and given the name `eval_model`.
- Once we have `eval_model` we execute the model against our frame using `evaluate1()`.
- When we receive back the analysis as `result` we create a new `Evaluation` object that includes this result.

# TiledClassifier
- `TiledClassifier` inherits from [`monai.networks.nets.Classifier`](https://docs.monai.io/en/stable/networks.html#classifier).
- This class has a single method `forward` which splits the input image into tiles and runs each tile through the analysis.
