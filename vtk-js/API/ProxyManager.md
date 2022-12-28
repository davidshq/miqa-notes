# `index.js`
- `extend`

# `core.js`
- `addRegistrationAPI(publicAPI, model)`
    - `registerProxy(proxy)`
    - `unRegisterProxy(proxyOrId`
- `publicAPI`
    - `.setActiveSource(source)`
    - `.setActiveView(view)`
    - `.getProxyById(id)`
    - `.getProxyGroups()`
    - `.getProxyInGroup(name)`
    - `.getSources()`
    - `.getRepresentations()`
    - `.getViews()`
    - `.createProxy(group, name, options)`
    - `.getRepresentation(source, view)`
    - `.deleteProxy(proxy)`

# `properties.js`
- `publicAPI`
    - `.getSections()`
    - `.updateCollapseState(name, state)`
    - `.applyChanges(changeSet)`
    - `.getLookupTable(arrayName, options)`
    - `.getPiecewiseFunction(arrayName, options)`
    - `.rescaleTransferFunctionToDataRange(arrayName, dataRange)`

# `state.js`
- `getProperties(proxy)`
- `addStateAPI(publicAPI, model)`
- `publicAPI`
    - `.loadState(state, options = {})`
    - `.saveState(options = {}, userData = {})`

# `view.js`
- `addViewHandlingAPI(publicAPI, model)`
- `publicAPI`
    - `.create3DView(options)`
    - `.create2DView(options)`
    - `.render(view)`
    - `.renderAllViews(blocking = false)`
    - `.setAnimationOnAllViews(enable = false)`
    - `.clearAnimations()`
    - `.autoAnimateViews(debouceTimeout = 250)`
    - `.resizeAllViews()`
    - `.resetCamera()`
    - `.createRepresentationInAllViews(source)`
    - `.resetCameraInAllViews()`