https://kitware.github.io/vtk-js/docs/structures.html
- VTK.js does not follow a one-to-one class mapping with VTK C++.
- "we rather use generic JavaScript objects which do not contain any methods and instead provide helper functions which decorate those data structures with methods when useful."
- Can export/import form/to JSON: https://kitware.github.io/vtk-js/examples/ActorSerialization.html
    - Another example: https://github.com/Kitware/vtk-js/blob/master/Sources/Testing/Examples/ActorSerialization/example/actor.json

# DataArray
https://kitware.github.io/vtk-js/docs/structures_DataArray.html
- "A data array is meant to keep track of numerical values while providing associated metadata such as size, tupleSize, data type, array name, component names and so on."

## Structure
- "The possible data types are only available in the language itself as typed arrays:"
- See original docs for table

## Scalar array in memory
```js
{
  vtkClass: 'vtkDataArray',
  name: 'Temperature',
  numberOfComponents: 1,
  size: 1024,
  dataType: 'Float32Array',
  buffer: new ArrayBuffer(), // Optional: Available if fetch from Network
  values: new Float32Array(this.buffer),
  ranges: [
    { min: -5.23, max: 25.7, component: 0, name: 'Scalar' },
  ],
}
```

## Vector array in memory
```js
{
  vtkClass: 'vtkDataArray',
  name: 'Velocity',
  numberOfComponents: 3,
  size: 3072,
  dataType: 'Float64Array',
  values: new Float64Array([...]),
  ranges: [
    { min: -5.23, max: 25.7, component: 0, name: 'X' },
    { min: -1, max: 1, component: 1, name: 'Y' },
    { min: -0.23, max: 2.7, component: 2, name: 'Z' },
    { min: -35.3, max: 125.7, component: -1, name: 'Magnitude' },
  ],
}
```

## Scalar array reference
- "Reference arrays are used within datasets that need to be fetched on the network or written on disk."
- "The `ref` section provides the information needed to download the array and fill it in memory."
```js
{
  vtkClass: 'vtkDataArray',
  name: 'Velocity',
  numberOfComponents: 3,
  size: 3072,
  dataType: 'Float64Array',
  values: null,
  ref: {
    id: '57b161d50afcda9eee221d6a5190075e',
    basepath: '/pointdata/',
    encode: 'LittleEndian',
  },
  ranges: [
    { min: -5.23, max: 25.7, component: 0, name: 'X' },
    { min: -1, max: 1, component: 1, name: 'Y' },
    { min: -0.23, max: 2.7, component: 2, name: 'Z' },
    { min: -35.3, max: 125.7, component: -1, name: 'Magnitude' },
  ],
}
```

# StringArray
https://kitware.github.io/vtk-js/docs/structures_StringArray.html
- "A String array is meant to keep track of String values. It is basically a standard JavaScript array where each value is expected to be a String."

## String array in memory
```js
{
  vtkClass: 'vtkStringArray',
  name: 'Players',
  numberOfComponents: 1,
  size: 1024,
  dataType: 'string',
  values: [ 'Player 1', 'Player 2', 'Palyer 3', ...],
}
```

## String array reference
```js
{
  type: 'vtkStringArray',
  name: 'Players',
  numberOfComponents: 1,
  size: 1024,
  values: null,
  dataType: 'string',
  ref: {
    id: '57b161d50afcda9eee221d6a5190075e',
    basepath: 'data',
    encode: 'JSON',
  },
}
```

# PolyData
https://kitware.github.io/vtk-js/docs/structures_PolyData.html
- "A PolyData is a surface mesh structure that can hold data arrays in points, cells or in the dataset itself."

## Structure
```js
{
  vtkClass: 'vtkPolyData',
  metadata: {
    name: 'example.vtk',
    size: 2345,
  },
  points: {
    vtkClass: 'vtkPoints',
    name: '_points',
    numberOfComponents: 3,
    size: 300,
    dataType: 'Float32Array',
    buffer: new ArrayBuffer(),
    values: new Float32Array(this.buffer),
    ranges: [
      { min: -1, max: 1, component: 0, name: 'X' },
      { min: -1, max: 1, component: 1, name: 'Y' },
      { min: -1, max: 1, component: 2, name: 'Z' },
    ],
  },
  verts: {
    vtkClass: 'vtkCellArray',
    name: '_verts',
    numberOfComponents: 1,
    size: 123,
    dataType: 'Uint32Array', // or Uint16Array
    buffer: new ArrayBuffer(),
    values: new Uint32Array(this.buffer), // Follow the CellArray Mapping [{nbPoints}, {pointIdx...}]
  },
  lines: {
    vtkClass: 'vtkCellArray',
    name: '_lines',
    numberOfComponents: 1,
    size: 0,
    dataType: 'Uint32Array', // or Uint16Array
    values: null,
  },
  polys: {
    vtkClass: 'vtkCellArray',
    name: '_lines',
    numberOfComponents: 1,
    size: 8,
    dataType: 'Uint32Array', // or Uint16Array
    values: new Uint32Array([3, 0, 1, 2, 3, 3, 4, 5]), // 2 triangles (0,1,2)+(3,4,5)
  },
  strips: {
    vtkClass: 'vtkCellArray',
    name: '_lines',
    numberOfComponents: 1,
    size: 0,
    dataType: 'Uint32Array', // or Uint16Array
    values: null,
  },
  pointData: {
    "vtkClass": "vtkDataSetAttributes",
    "activeGlobalIds": -1,
    "activeNormals": -1,
    "activePedigreeIds": -1,
    "activeScalars": 0,
    "activeTCoords": -1,
    "activeTensors": -1,
    "activeVectors": -1,
    "copyFieldFlags": [],
    "doCopyAllOff": false,
    "doCopyAllOn": true,
    "arrays": [
      {
        "data": {
          vtkClass: 'vtkDataArray',
          name: 'Temperature',
          numberOfComponents: 1,
          size: 300,
          dataType: 'Float32Array',
          buffer: new ArrayBuffer(), // Optional: Available if fetch from Network
          values: new Float32Array(this.buffer)
        }
      }
    ],
  },
  cellData: {
    "vtkClass": "vtkDataSetAttributes",
    "activeGlobalIds": -1,
    "activeNormals": -1,
    "activePedigreeIds": -1,
    "activeScalars": 0,
    "activeTCoords": -1,
    "activeTensors": -1,
    "activeVectors": -1,
    "copyFieldFlags": [],
    "doCopyAllOff": false,
    "doCopyAllOn": true,
    "arrays": [
      {
        "data": {
          type: 'vtkDataArray',
          name: 'CellId',
          numberOfComponents: 1,
          size: 132,
          dataType: 'Uint32Array',
          values: new Uint32Array(this.buffer)
        }
      }
    ]
  },
  fieldData: {
    "vtkClass": "vtkDataSetAttributes",
    "activeGlobalIds": -1,
    "activeNormals": -1,
    "activePedigreeIds": -1,
    "activeScalars": -1,
    "activeTCoords": -1,
    "activeTensors": -1,
    "activeVectors": -1,
    "copyFieldFlags": [],
    "doCopyAllOff": false,
    "doCopyAllOn": true,
    "arrays": [
      {
        "data": {
          vtkClass: 'vtkVariantArray',
          name: 'Meta',
          size: 3,
          dataType: 'JSON',
          values: ['Some string', [1, 2, 3], { ex: 'obj' }],
        }
      }
    ]
  }
}
```