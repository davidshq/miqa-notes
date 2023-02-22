{
    activate: () => { /* ... */ }
    addEstimatedRenderTime: t => { model.estimatedRenderTime += t; }
    addTexture: texture => { /* ... */ }
    clearKeystore: () => { /* ... */ }
    delete: () => { /* ... */ }
    deleteKey: key => delete model.keystore[key]
    gcPropertyLinks: type => { /* ... */ }
    get: (...list) => { /* ... */ }
    getActors: () => model[field]
    getActors2D: () => []
    getAllKeys: () => Object.keys(model.keystore)
    getAllocatedRenderTime: () => model[field]
    getAnnotations: () => { /* ... */ }
    getBounds: () => { /* ... */ }
    getClassName: (depth = 0) => { /* ... */ }
    getColorBy: () => { /* ... */ }
    getDataArray: (arrayName, arrayLocation) => { /* ... */ }
    getDragable: () => model[field]
    getEstimatedRenderTime: () => model[field]
    getInput: () => model[field]
    getInputDataSet: () => model.input ? model.input.getDataset() : null
    getInterpolationType: () => model[field]
    getKey: key => model.keystore[key]
    getLookupTableProxy: arrayName => { /* ... */ }
    getMTime: () => { /* ... */ }
    getMapper: () => model[field]
    getNestedDragable: () => { /* ... */ }
    getNestedPickable: () => { /* ... */ }
    getNestedProps: () => nestedProps
    getNestedVisibility: () => { /* ... */ }
    getParentProp: () => model[field]
    getPickable: () => model[field]
    getPiecewiseFunctionProxy: arrayName => { /* ... */ }
    getPropertyByName: name => getProperties().find(p => p.name === name)
    getPropertyDomainByName: name => (propertyMap[name] || {}).domain
    getPropertyLink: (id, persistent = false) => { /* ... */ }
    getProxyGroup: () => model[field]
    getProxyId: () => model[field]
    getProxyManager: () => model[field]
    getProxyName: () => model[field]
    getProxySection: () => { /* ... */ }
    getRedrawMTime: () => model.mtimeget
    ReferenceByName: val => model[val]
    getRenderTimeMultiplier: () => model[field]
    getRescaleOnColorBy: () => model[field]
    getSlice: () => model[field]
    getSliceIndex: () => { /* ... */ }
    getSlicingMode: () => model[field]
    getState: () => { /* ... */ }
    getSupportsSelection: () => false
    getTextures: () => model.textures
    getUseBounds: () => model[field]
    getVisibility: () => model[field]
    getVolumes: () => model[field]
    getWindowLevel: () => model[field]
    getWindowWidth: () => model[field]
    hasKey: () => { /* ... */ }
    hasTexture: texture => model.textures.indexOf(texture) !== -1
    isA: className => { /* ... */ }
    isDeleted: () => !!model.deleted
    isVisible: () => { /* ... */ }
    listDataArrays: () => { /* ... */ }
    listPropertyNames: () => getProperties().map(p => p.name)
    modified: otherMTime => { /* ... */ }
    onModified: callback => { /* ... */ }
    pick: () => { /* ... */ }
    registerPropertyLinkForGC: (otherLink, type) => { /* ... */ }
    removeAllTextures: () => { /* ... */ }
    removeTexture: texture => { /* ... */ }
    rescaleTransferFunctionToDataRange: (n, l, c = -1) => { /* ... */ }
    restoreEstimatedRenderTime: () => { /* ... */ }
    set: (map = {}, noWarning = false, noFunction = false) => { /* ... */ }
    setAllocatedRenderTime: t => { /* ... */ }
    setColorBy: (arrayName, arrayLocation, componentIndex = -1) => { /* ... */ }
    setDragable: setter(value)
    setEstimatedRenderTime: t => { /* ... */ }
    setInput: source => { /* ... */ }
    setInterpolationType: setter(value)
    setKey: (key, value) => { model.keystore[key] = value; }
    setLookupTableProxy: () => {}
    setParentProp: setter(value)
    setPickable: setter(value)
    setPiecewiseFunctionProxy: () => {}
    setProxyManager: setter(value)
    setRenderTimeMultiplier: setter(value)
    setRescaleOnColorBy: setter(value)
    setSlice: setter(value)
    setSlicingMode: mode => { /* ... */ }
    setUseBounds: setter(value)
    setVisibility: setter(value)
    setWindowLevel: setter(value)
    setWindowWidth: setter(value)
    shallowCopy: (other, debug = false) => { /* ... */ }
    updateColorByDomain: () => { /* ... */ }
    updateProxyProperty: (propertyName, propUI) => { /* ... */ }
    updateUI: ui => { /* ... */ }
    [[Prototype]]: Object
}