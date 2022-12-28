from evaluation_models import NNModel
from enum import Enum
from nn_inference import evaluate1
from pathlib import Path
import tempfile

# From models/frame.py
class StorageMode(Enum):
    CONTENT_STORAGE = 1
    LOCAL_PATH = 2
    S3_PATH = 3
# End models/frame.py

frame = {}
eval_model_name = ''
eval_model_file = ''
eval_model_predictions = []

eval_model_nn = NNModel(eval_model_file, eval_model_predictions)

eval_model = eval_model_nn.load()

with tempfile.TemporaryDirectory() as tmpdirname:
    if frame.storage_mode == StorageMode.LOCAL_PATH:
        dest = Path(frame.raw_path)
    else:
        dest = Path(tmpdirname, frame.content.name.split('/')[-1])
        with open(dest, 'wb') as fd:
            fd.write(frame.content.open().read())
    result = evaluate1(eval_model, dest)

    print(f'Frame: {frame}')
    print(f'Model Name: {eval_model_name}')
    print(f'Result:\n{result}')