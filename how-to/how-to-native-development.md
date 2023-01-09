# Finding the Native Development Directions
In the `dev` folder of MIQA one can find a `NATIVE.md` file which explains how to setup the application to perform local development.

# Run Docker command from repo root, not dev folder
In the `/dev/README.md` one is instructed to run the `docker-compose` command from within the `/dev` folder. When running the `NATIVE` configuration you'll need to use the `docker-compose.yml` file in the root of the repo. 

# Running Native Development After Performing Standard Dev Environment Setup
It's worth noting that this can also be run after doing a full setup (e.g. using `dev/README.md`). Ensure all the Docker containers have been shut down and then run the `docker-compose` command in `NATIVE.md`.

You can then proceed with the instructions under "Initial Setup" under `NATIVE.md`, but assuming you've fully setup the standard (`dev/README.md`) configuration you can skip steps 7, 8, and 9.

# Using Docker for the node.js frontend
Also note that it is possible to continue running the node.js frontend by starting up the `npm` container.

# What is still running in Docker with native?
By default MIQA will still use the `rabbitmq`, `minio`, and `postgres` containers. As noted above it is also possible to run the frontend using the `npm ` container if one has performed a full setup (e.g. using `dev/README.md`) previously.