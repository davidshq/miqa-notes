# Overview
https://kitware.github.io/vtk-js/docs/index.html
- "The Visualization Toolkit (VTK) is an open source, freely available software system for 3D computer graphics, image processing, and visualization."
- vtk.js is an implementation of VTK in JavaScript that consists of an ES6 class library which can be integrated into any web application.
- "VTK.js is a complete rewrite of VTK/C++ using plain JavaScript (ES6)."
  - The rewrite focuses on implementing the rendering pipeline (for ImageData and PolyData), pipeline infrastructure, and frequently utilized readers (obj, stl, vtp, vti).
  - Also provides helper classes to connect to a remote VTK/ParaView server.

# Importing vtk.js as an external script
https://kitware.github.io/vtk-js/docs/intro_vtk_as_external_script.html
- Demonstrates how to use an externally hosted version of VTK.js to create a simple, maniputable cone in the browser.

# Using vtk.js as an ES dependency
https://kitware.github.io/vtk-js/docs/intro_vtk_as_es6_dependency.html
- Recommended usage is as via npm, to add to existing project: `npm install --save @kitware/vtk.js`.
- Some information on utilizing older versions / migrating from older versions.

## Organization of vtk.js
- Modules have been separated into folders, below lays out general organization:
    - Common: core classes (including `vtkImageData` and `vtkPolyData`)
    - Filters: data processing, manipulation, generation
    - Interaction: interaction helpers
    - IO: reading and writing common data types
    - Rendering: rendering core
    - Widgets: interactive widget manipulation

## How to Try an Example
- Unsure if this section is still relevant.

# Using vtk.js with React
https://kitware.github.io/vtk-js/docs/vtk_react.html

# Using vtk.js with vue.js
https://kitware.github.io/vtk-js/docs/vtk_vue.html

# Starting a vtk.js project from scratch
- https://kitware.github.io/vtk-js/docs/vtk_vanilla.html

## Initialize project
- `mkdir my-vtkjs-app`
- `cd my-vtkjs-app`
- `npm init`
- `npm install @kitware/vtk.js`
- `npm install -D webpack-cli webpack webpack-dev-server`

## Project scaffolding
- `mkdir dist/ src/`
- Inside `dist/` create an `index.html` file:
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <script src="./main.js"></script>
  </body>
</html>
```
- Add scripts to run build commands to `package.json`:
```json
   "scripts": {
     "build": "webpack --progress --mode=development",
     "start": "webpack serve --progress --mode=development --static=dist",
     "test": "echo \"Error: no test specified\" && exit 1"
   },
```

## Using vtk.js in your app
- Create a `src/index.js` file and add the following:
```js
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';

import vtkActor           from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper          from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkCalculator      from '@kitware/vtk.js/Filters/General/Calculator';
import vtkConeSource      from '@kitware/vtk.js/Filters/Sources/ConeSource';
import { AttributeTypes } from '@kitware/vtk.js/Common/DataModel/DataSetAttributes/Constants';
import { FieldDataTypes } from '@kitware/vtk.js/Common/DataModel/DataSet/Constants';

const controlPanel = `
<table>
  <tr>
    <td>
      <select class="representations" style="width: 100%">
        <option value="0">Points</option>
        <option value="1">Wireframe</option>
        <option value="2" selected>Surface</option>
      </select>
    </td>
  </tr>
  <tr>
    <td>
      <input class="resolution" type="range" min="4" max="80" value="6" />
    </td>
  </tr>
</table>
`;

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const coneSource = vtkConeSource.newInstance({ height: 1.0 });
const filter = vtkCalculator.newInstance();

filter.setInputConnection(coneSource.getOutputPort());
filter.setFormula({
  getArrays: inputDataSets => ({
    input: [],
    output: [
      { location: FieldDataTypes.CELL, name: 'Random', dataType: 'Float32Array', attribute: AttributeTypes.SCALARS },
    ],
  }),
  evaluate: (arraysIn, arraysOut) => {
    const [scalars] = arraysOut.map(d => d.getData());
    for (let i = 0; i < scalars.length; i++) {
      scalars[i] = Math.random();
    }
  },
});

const mapper = vtkMapper.newInstance();
mapper.setInputConnection(filter.getOutputPort());

const actor = vtkActor.newInstance();
actor.setMapper(mapper);

renderer.addActor(actor);
renderer.resetCamera();
renderWindow.render();

// -----------------------------------------------------------
// UI control handling
// -----------------------------------------------------------

fullScreenRenderer.addController(controlPanel);
const representationSelector = document.querySelector('.representations');
const resolutionChange = document.querySelector('.resolution');

representationSelector.addEventListener('change', (e) => {
  const newRepValue = Number(e.target.value);
  actor.getProperty().setRepresentation(newRepValue);
  renderWindow.render();
});

resolutionChange.addEventListener('input', (e) => {
  const resolution = Number(e.target.value);
  coneSource.setResolution(resolution);
  renderWindow.render();
});
```

## Running the app
- `npm run start`
- Open browser to http://localhost:8080
- Provides a simple 3D cone which can be manipulated in various ways.

# Tutorials and Training
https://kitware.github.io/vtk-js/docs/tutorial.html

Links out to a few video tutorials, I ran into some issues when trying to run these as some of the VTK.js code seems to have changed since the videos were made.

# (Old approach) Transpiling vtk.js manually
https://kitware.github.io/vtk-js/docs/old_intro_vtk_es6.html

You shouldn't do this.