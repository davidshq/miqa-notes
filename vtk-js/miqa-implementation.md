# General
- `proxyManager` is an instance of `vtkProxyManager`

# `index.ts`
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

# `viewManager.js`
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

# `crosshairs.js`
- `vtkCellPicker` from `Rendering/Core/CellPicker`

# `fill2DView.js`
- View
    - `.resize()`
    - `.getName()`
    - `.getRenderer()`
    - `.computeVisiblePropBounds()`
    - `.getContainer()`
        `.clientWidth`
        `.clientHeight`
    - `.getCamera()`
    - `.setParallelScale()`

# `ReaderFactory.js`
- `vtkReader` = `vtkITKImageReader` (see `registerReaders.js`)
- ?

# `registerReaders.js`
- `vtkITKImageReader` from `IO/Misc/ITKImageReader`
    - `.seReadImageArrayBufferFromITK()`
- `vtkReader`

# `ColorMaps.js`
- `vtkColorMaps` from `Rendering/Core/ColorTransferFunction/ColorMaps`
    - `.getPresetByName()`
    - `.addPreset()`

# `configUtils.js`
- `def.options.activateOnCreate`

# `proxy.js`
- `vtk2DView` from `Proxy/Core/View2DProxy`
- `vtkLookupTableProxy` from `Proxy/Core/LookupTableProxy`
- `vtkPiecewiseFunctionProxy` from `Proxy/Core/PiecewiseFunctionProxy`
- `vtkProxySource` from `Proxy/Core/SourceProxy`
- `vtkSliceRepresentationProxy` from `Proxy/Representations/SliceRepresentationProxy`
- `vtkView` from `Proxy/Core/View/ViewProxy`
- `vtkVolumeRepresentationProxy` from `Proxy/Representations/VolumeRepresentationProxy`
- `Rendering/Profiles/All`
- vtkImageData?

# `proxyFilter.js`
- `vtkProxySource` from `Proxy/Core/SourceProxy`
- `vtkImageMarchingCubes` from `Filters/General/ImageMarchingCubes`
- Frame
    - `.getPointData()`
    - `.getScalars()`
    - `.getArrayByIndex()`
    - `.getRange()`
    - `.updatProxyProperty()` - On self?

# `viewManager.js`
- `proxyManager`
    - `.getViews()`
    - `.createProxy()`
    - `.getSources()`
    - `.getRepresentation()`
- View
    - `.getProxyName()`
    - `.getName()`
    - `.updateOrientation()`
    - `.setBackground()`
    - `.setPresentToOrientationAxes()`

# Helpful Resources
- https://kitware.github.io/vtk-js/api/Rendering_Core_RenderWindow.html
- https://kitware.github.io/vtk-js/api/Rendering_Misc_RemoteView.html