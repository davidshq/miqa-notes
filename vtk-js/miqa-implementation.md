# General
- `proxyManager` is an instance of `vtkProxyManager`

# index.ts
- `ProxyManager`
    - `.getViews()`
    - `.deleteProxy()` - Used to delete a proxy View
    - `.getRepresentation()`
    - `.newInstance()`
    - `.getActiveSource()`
    - `.createProxy()`
- Source
    - `setInputData()`
- View
    - `.setContainer()`
    - `.setOrientationAxesVisibility()`
    - `.getRepresentations()`
    - `.render()`
    - `.getName()`
- Representation
    - `.setInterpolationType()` - Always `InterpolationType.NEAREST`
    - `.onModified()` - Render the view.
    - `.setSlice()`
- Frame
    - `.getPointData()`
    - `.getArray()`
    - `.getRange()`
- `InterpolationType` from `Rendering/Core/ImageProperty/Constants`
- `convertItkToVtkImage` from `ITKHelper` from `Common/DataModel/ITKHelper`

# viewManager.js
- `getNumberOfVisibleViews`
    - `RemoteView.getContainer` - Gets container element.
    - `RenderWindow.getViews`
- `getViewActions`
    - `proxyManager.getSources()`
    - `s.getFrame()`
- `getView`
    - `RenderWindow.getViews`
    - `getProxyName()`
    - `getName()`
    - `vtkProxyManager.createProxy`
    - `updateOrientation`
    - `setBackrgound`
    - `setPresetToOrientationAxes`

- https://kitware.github.io/vtk-js/api/Rendering_Core_RenderWindow.html
- https://kitware.github.io/vtk-js/api/Rendering_Misc_RemoteView.html