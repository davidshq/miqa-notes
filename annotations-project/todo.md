# TODO

Consists of various code work to be done...

- Either expose group settings in frontend UI or auto-set default settings for groups or error message directing to update admin settings before importing.
- Allow default group settings to be set globally.
- Add tests for dynamic settings implementation.
- Update `Project.clean()`, it currently looks at `evaluation_models` and hard codes `available_evaluation_models`.
- Remove `evaluation_models` from Project.
- Add new fields to `Project` REST.


## Low Priority Possibilities
- Abstract `SCAN_TYPES` to dynamic settings.
- Abstract `DECISION_CHOICES` to dynamic settings.
- Abstract `ArtifactState` to dynamic settings.
- Abstract `StorageMode` to dynamic settings.
- Abstract `auto_artifact_threshold` (0.4), `artifact_states`, `NORMAL_USERS_CAN_CREATE_PROJECTS`, `S3_SUPPORT`