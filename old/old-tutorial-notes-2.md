2. starting-a-vtk.js-application
# Developing with VTK.js
- https://vimeo.com/375520781 (33 mins.)

- Isomics
- Open Health Imaging Foundation

# Requirements
- Modern browser w/WebGL
    - get.webgl.org
- Text Editor

- Dev
- node.js
- npm or yarn
- terminal emulator
- familiarity w/browser devtools

# Source files
- See slides

# Super Simple Example
- Single file, standalone.html
- Attach WebGL RenderWindow implementation
- First render window - abstract
- Second is delegate that handles abstract to WebGL calls, mounts to DOM
- Attach interactive code
    - Translates events into actions
- Construct rendering pipeline for cone
    - Creating cone
    - Adding to actor, mapper
    - Adding to scene

- Try:
    -Other surface source: vtkCylinderSource, vtkSphereSource, vtkPlaneSource
    - Modify some propeerties of the sources, e.g. cone.setHeight(3.0)

# Project Creation Example
- src/ - source code
- dist/ - final bundled files

- `npm init`
- name: example:
- version: 1.0.0
- description: A vtk.js example
- entry point: src/index.js

# Installing tooling and dependencies
- npm install --save vtk.js
- npm install --save-dev kw-web-suite - see slides

# Creating initial files
- Don't create app.js, webpack geenrates for us.

# Creating files: src/index.js

# Creating files: webpack.config.js
- Copy from complete sources repo
- Import vtkRules, concat custom rules

# Building example:
- npx webpack --progress
- or npm run build
- or npm run dev
- These two latter need package.json modified:
"scripts": {
    "build": "webpack --progress --mode=production",
    "dev": "webpack-dev-server --mode=development"
}

11 mins 10 secs: https://vimeo.com/375521036