# Dynamic Settings

One aspect of the Annotations project has been the abstraction of various hard-coded settings in MIQA. MIQA Annotations is directed particularly towards lung scans while the initial use case for MIQA was brain scans, as such some of the models, artifacts, etc. do not align.

Rather than change the hard-coded instances we have chosen to make the settings dynamically configurable.

This document begins with a brief explanation of how one needs to setup the projects when using annotations and then continues with a description of the abstraction created.

## Using the Dynamic Settings (BEFORE IMPORT!)
At this time the dynamic settings are only exposed in the admin back-end (http://localhost:8000/admin) and can be configured after a project has been created in MIQA BUT BEFORE any scans are added/imported to the project.

Through the admin one should select under **MIQA: CORE** *Projects*. Then select the desired Project.

This will bring up a form interface for modifying the project. You should set:

1. An artifact group
    Example settings: truncation_artifact, full_brain_coverage, misalignment
2. A model source type mapping group
    Example settings:
        ncanda-grefieldmap-v1, MIQAMix-0 # When using a file of type ncanda-grefieldmap-v1 use the MIQAMix-0 model
        DWI, MIQAT1-0
3. A model mapping group
    Example Settings:
        MIQAT1-0, miqaT1-val0.pth # The name of a model and its associated PyTorch model filename
        MIQAMix-0, miqaMix-val0.pth
4. A model predictions group
    Example Settings:
        MIQAT1-0, signal_to_noise_ratio # One of the predictions available to the learning model MIQAT1-0 is signal_to_noise_ratio
        MIQAMix-0, normal_variants
        MIQAMix-0, inhomogeneity
        MIQAT1-0, contrast_to_noise_ratio

There are "Default" groups already created for each of these groups but you'll need to manually select them if you desire to use them, they ARE NOT auto-selected.

## Adding A Group
Under **MIQA: CORE** choose *Settings groups* and add a new group. A group is a simple entity with a name and a description.

## Adding Settings
Under **MIQA: CORE** choose *Settings* and add a new setting. Settings can take several values:
- Key (name)
- Value (setting)
- Type (type of setting)
- Group (group setting belongs to)
- Is Type (is this setting defining a type)

You should always set a key and a type.

You may not always need to set a value. For example, "Artifacts" key (name) are identical with their value.

You do not have to but generally will want to add a setting to a group. While settings can be added to existing groups it is generally best to create a new group.

## Additional Notes

- You can create a new type of setting by creating a setting, choosing "Setting Type" as its Type and checking "Is Type".
- The inability to link a setting setting to multiple groups is intentional. While this would reduce some duplication of settings it also could create unexpected, cascading effects when a setting is deleted.
    - For example, if someone where to delete the "truncation_artifact" setting intending to remove it only from their group, it would instead be removed from all groups. Forcing settings to be assigned to a single group ensures the effect of setting deletion is limited.