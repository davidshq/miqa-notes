# Project
The most general / high-level container in MIQA it represents an entire research project.
- The setting of sharing permissions occurs at the Project level.

# Experiment
- Within each project there are zero or more experiments.

# Scan
A collection of related 3D medical images.
- Within each experiment there are zero or more scans.

# Frame
Each frame is associated with an individual image file.
- Represents any sub-scan structure, e.g. time steps or positions.
- Within each scan there are zero or more frames.

# Users
There are several types of users:
- **Administrators** - Have unrestricted access to the MIQA system and database.
    - They can see/edit all projects, experiments, scans, etc.
- **Privileged Users** - Includes the creator of the project (*Project Creator*) as well as any superusers.
    - Able to set permissions for other users on the project.
- **Superusers** - Able to set permissions for other users on a project, able to configure imports (set the file path).
- **Collaborators** - Have read-only access.
- **Members** - Include both *Tier 1* and *Tier 2*.
    - May make an importance once import path has been set by someone with appropriate permissions.