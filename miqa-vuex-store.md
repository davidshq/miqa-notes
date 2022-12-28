# Non-Strictly Store Functions
These functions are at the beginning of the store, but imho, should probably be moved into a separate non-store file. They largely relate to fetching and manipulating image data.

- shrinkProxyManager
- prepareProxyManager
- getArrayName
- getData
- loadFile
- loadFileAndGetData
- poolFunction
- progressHandler
- startReaderWorkerPool
- queueLoadScan
- getNextFrame
- expandScanRange
- includeScan

# State
- MIQAConfig
- me
- allUsers
- reviewMode
- globalSettings

- currentProject
- currentTaskOverview
- currentProjectPermissions

- projects

- experimentIds
- experiments
- experimentScans

- scans
- scanFrames

- frames

- proxyManager

- vtkViews

- currentFrameId
- loadingFrame
- errorLoadingFrame

- currentScreenshot
- screenshots

- scanCachedPercentage

- showCrosshairs
- storeCrosshairs

- sliceLocation
- iIndexSlice
- jIndexSlice
- kIndexSlice

- currentWindowWidth
- currentWindowLevel
- windowLocked
    - lock
    - duration
    - target
    - associatedImage

- renderOrientation

- workerPool

- lastApiRequestTime

# Getters
- currentViewData

- currentFrame
- previousFrame
- nextFrame

- currentScan

- currentExperiment

- myCurrentProjectRoles

# Mutations
- reset
- setMIQAConfig
- setMe
- setAllUsers
- resetProject

- setCurrentFrameId
- setFrame

- setScan

- setRenderOrientation

- setCurrentProject

- setGlobalSettings

- setTaskOverview

- setProjects

- addScanDecision

- setFrameEvaluation

- setCurrentScreenshot
- addScreenshot
- removeScreenshot

- updateLastApiRequestTime

- setLoadingFrame
- setErrorLoadingFrame

- addScanFrames
- addExperimentScans
- addExperiment

- updateExperiment

- setWindowLocked

- setScanCachedPercentage

- setCurrentVtkIndexSlices

- setShowCrosshairs
- setStoreCrosshairs

- switchReviewMode

# Actions
- reset
- loadConfiguration
- loadMe
- loadAllUsers
- loadGlobal

- loadProjects
- loadProject

- reloadScan
- loadScan

- setCurrentFrame
- swapToFrame

- setLock