1. Create a new codespace on a fork of MIQA.
2. Add a `.devcontainer` folder with a `devcontainer.json` file inside of it with the following contents:
```json
{
  "image": "mcr.microsoft.com/devcontainers/universal:2",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  }
}
```
> This starts a container that includes Docker pre-configured to run within the container.
3. Follow directions in the MIQA repository's `dev/README.md`
4. You'll need to stop the codespace as the setup consumes a lot of memory and trying to run `docker compose up` after the setup will be terminated due to consuming too many resources.
5. Start the codespace again.
6. Now you can run `docker compose up` from the dev directory.
4. Open in VSC.
    - The redirection from Django to Vue doesn't work unless the codespace is running from VSC in which case it can use the localhost address.
    - Note: While a project could be created using the simple-scans images there is an error loading the images. You can however upload and view local images.