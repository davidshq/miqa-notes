# Introduction
MIQA includes machine learning functionality that handles auto ratings of scans. This functionality is found primarily in the learning sub-folder of miqa and consists of the following:

# correlator.py
- `pandas`
- `sklearn.metrics`
    - `confusion_matrix`

# evaluation_models.py
- Standard Library: 
    - `abc`
        - `ABC`
        - `abstractclassmethod`
    - `pathlib`
        - `Path`
    - `typing`
        - `List`
    - `uri`
        - `URI`
- `miqa.learning.nn_inference`
    - `get_model`

# nn_inference.py
- Standard Library
    - `logging`
    - `math`
- `itk`
- `monai`
- `sklearn.metrics`
    - `classification_report`
    - `confusion_matrix`
    - `mean_squared_error`
    - `r2_score`
- `torch`
    - `torch.utils.data`
        - `DataLoader`
- `torchio`
- `wandb`

# nn_training.py
- Standard Library
    - `argparse`
    - `logging`
    - `math`
    - `os`
    - `pathlib`
        - `Path`
    - `random`
    - `sys`
- `itk`
- `monai`
- `nn_inference`
    - `artifacts`
    - `clamp`
    - `evaluate1`
    - `evaluate_model`
    - `get_itk_image_view_from_torchio_image`
    - `get_model`
    - `get_torchio_image_from_itk_image`
    - `regression_count`
- `numpy`
- `pandas`
- `sklearn.metrics`
    - `confusion_matrix`
- `torch`
    - `torch.utils.data`
        - `DataLoader`
    - `torch.utils.tensorboard`
        - `SummaryWriter`
- `torchio`
- `wandb`