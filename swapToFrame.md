===
# Condensed
1. Place `currentScan` into `oldScan`
2. Place `scans[frame.scan]` into `newScan`.
3. If `oldScan` and `newScan` are different, call `queueLoadScan`.
4. If `proxyManager` has a value, called `shrinkProxyManager`.
5. If we don't have a `proxyManager` create a new `proxyManager` using `vtkProxyManager.newInstance`
6. Get the `sourceProxy` from `proxyManager.getActiveSource()`
7. If there isn't a `sourceProxy`, create one using `ProxyManager.createProxy`.
8. Try to load a frame.
    - Set `sourceProxy.setInputData` to `frameData`.
    - If necessary, execute `prepareProxyManager` on `proxyManager` and set the `vtkViews` equal to `proxyManager.getViews()`.
9. Check for window luck and unlock if appropriate.
===
# Lengthy
1. Return if frame doesn't exist or frame is same as current frame.
2. Change `setLoadingFrame` to true, `setErrorLoadingFrame` to false.
3. Place the `currentScan` into `oldScan`.
4. Place `state.scans[frame.scan]` into `newScan`.
5. If the `oldScan` and `newScan` aren't the same, `queueLoadScan`.
6. Set `newProxyManager` to false.
7. If the `oldScan` is not equal to the `newScan` and `state.proxyManager` has a value, call `shrinkProxyManager` on `state.proxyManager` and set `newProxyManager` to true.
8. If we don't have a `proxyManager` or `newProxyManager` is set to true, create a new `proxyManager` instance using `vtkProxyManager.newInstance` and set `state.vtkViews = []`.
9. Get the `sourceProxy` from `state.proxyManager.getActiveSource()` and set `needPrep` to false.
10. If there isn't a valid `sourceProxy` create one using `state.ProxyManager.createProxy` and set `needPrep` to true.
11. Try to load a frame.
    - If the `frameCache` already has the frame, place the `frameData` for that frame into `frameData`.
    - Otherwise use `loadFileAndGetData` to get the `frameData` and place in `frameData`.
    - Set `sourceProxy.setInputData` to `frameData`.
    - If `needPrep` is true or `state.proxyManager.getViews()` has no views `prepareProxyManager(state.proxyManager)`. Then add views to `vtkViews` from `state.proxyManager.getViews()`.
    - If there is an error, reset `state.vtkViews` and `setErrorLoadingFrame` to true.
12. As `finally` dispatch `setCurrentFrame` to `frame.id` and set `setLoadingFrame` to false.
13. Check if there is a lock: `windowLocked.lock`
    - If there is, get the `currentViewData`
    - If the scanId, experimentId, or projectId don't match `state.windowLocked.target` then unlock.