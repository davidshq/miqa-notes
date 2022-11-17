# index.ts
- `shrinkProxyManager(proxyManager)`
    - Unsets the container associated with a given view.
    - Deletes the given proxy view.
- `prepareProxyManager(proxyManager)`
    - Gets each view from the `proxyManager`
    - Sets the `OrientationAxesVisibility` to false for each view
    - Gets the representations for each view and sets `InterpolationType` to `NEAREST`
        - and sets the `onModified` callback to `view.render(true)`.
- `[SET_SLICE_LOCATION] (state, ijkLocation)`
    - Saves the location of the cursor click for a specific scan/decision
- `swapToFrame({ state, dispatch, getters, commit}, { frame, onDownloadProgress = null })`
    - Creates a new `proxyManager` instance if necessary
    - Sets the ActiveSource for the `proxyManager`
    - Sets the InputData for the `sourceProxy`
    - Places the views from the `proxyManager` in `state.vtkViews`

# viewManager.js
- `getView(proxyManager, viewType)`
    - Gets the views from the `proxyManager`
    - Checks that the `viewType` matches the given views `ProxyName`
    - Creates a proxy if necessary
    - Creates a representation for each view, if necessary
    - Updates the orientation of each view, if necessary
    - Sets the background for each view, if necessary
    - Sets the PresetToOrientationAxes for each view, if necessary

# ControlPanel.vue
- Gets the representations for the `proxyManager`

# ControlPanelDecision.vue
- Gets the representations for the `proxyManager`
- Gets the slice of the representation from the `proxyManager`

# VtkViewer.vue
- Gets the representation from the `proxyManager`
