## Outside
- ColorMaps.js
    - vtkColorMaps
- proxy.js
    - vtk2DView
    - vtkLookupTableProxy
    - vtkPiecewiseFunctionProxy
    - vtkProxySource
    - vtkSliceRepresentationProxy
    - vtkView
    - vtkVolumeRepresentationProxy
    - vtkGeometryRepresentationProxy
    - Rendering/Profiles/All
- proxyFilter.js
    - vtkProxySource
    - vtkImageMarchingCubes
- crosshairs.js
    - vtkCellPicker
    - vtkImageReader
- registerReaders.js
    - vtkITKImageReader

## Vuex Store
- vtkProxyManager
- macros
- IntepolationType
- ITKHelper: convertItkImageToVtkImage

## proxyManager (VtkViewer.vue)
- representation = proxyManager.getRepresentation(null, this.view)
    - .getPropertyDomainByName('slice')
    - .getSlice()
    - .setSlice(newValue) (or slice)
    - .getSliceIndex()
    - representationProperty = .getActor()[0].getProperty()
        - .setColorWindow(this.currentWindowWidth)
        - .setColorLevel(this.currentWindowLevel)
    - onModified()
    - orientation = .getInputDataSet().getDirection()

## view (VtkViewer.vue)
- .getName()
- renderSubscription = .getInteractor().onRenderEvent()
    - .unsubscribe()
- .getInteractor()
    - .onLeftButtonPress()
- targetManipulator = .getInteractorStyle().getMouseManipulators().find(manipulator)
    - .getClassName(manipulator)
    - .setDragEnabled(false)
- .setContainer(this.$refs.viewer)
- .getCamera()
- newViewUp VIEW_ORIENTATIONS[renderOrientation][this.name].viewUp.slice()
- camera.setDirectionOfProject(...newDirectionOfProjection)
- camera.setViewUp(...newViewUp)
- .resetCamera()




