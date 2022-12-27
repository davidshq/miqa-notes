import nn_inference
import pytest

class Test_Reorientandrescale_Apply_transform:
    
    @pytest.fixture()
    def reorientandrescale(self):
        return nn_inference.ReorientAndRescale()
    

    def test_apply_transform_1(self, reorientandrescale):
        result = reorientandrescale.apply_transform("dummy subject")

    def test_apply_transform_2(self, reorientandrescale):
        result = reorientandrescale.apply_transform("A sub-message")

    def test_apply_transform_3(self, reorientandrescale):
        result = reorientandrescale.apply_transform("Error: Unknown URL")

    def test_apply_transform_4(self, reorientandrescale):
        result = reorientandrescale.apply_transform("Subject: %s")

    def test_apply_transform_5(self, reorientandrescale):
        result = reorientandrescale.apply_transform("")

