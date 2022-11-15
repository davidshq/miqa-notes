Was in `index.js` but commented out as seen below:
```js
// import vtkBoundingBox from '../BoundingBox';
// import * as vtkMath from '../../Core/Math';
//
// function getBounds(dataset) {
//   if (dataset.bounds) {
//     return dataset.bounds;
//   }
//   if (dataset.type && dataset[dataset.type]) {
//     const ds = dataset[dataset.type];
//     if (ds.bounds) {
//       return ds.bounds;
//     }
//     if (ds.Points && ds.Points.bounds) {
//       return ds.Points.bounds;
//     }

//     if (ds.Points && ds.Points.values) {
//       const array = ds.Points.values;
//       const bbox = [...vtkBoundingBox.INIT_BOUNDS];
//       const size = array.length;
//       const delta = ds.Points.numberOfComponents ? ds.Points.numberOfComponents : 3;
//       for (let idx = 0; idx < size; idx += delta) {
//         vtkBoundingBox.addPoint(bbox, array[idx * delta], array[(idx * delta) + 1], array[(idx * delta) + 2]);
//       }
//       ds.Points.bounds = bbox;
//       return ds.Points.bounds;
//     }
//   }
//   return vtkMath.createUninitializedBounds();
// }
```
