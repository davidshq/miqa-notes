# `swapToFrame`
When we want to load a scan we use `swapToFrame`, it is from this everything else will flow.

Calls:
- `queueLoadScan`
- `proxyManager`
    - `getActiveSource`
    - `createProxy`
    - `getViews`
- `shrinkProxyManager`
- `vtkProxyManager`
- `loadFileAndGetData`
- `sourceProxy`
    - `setInputData`
- `prepareProxyManager`
- `vtkViews`
- `updateLock`


# `queueLoadScan`
Adds the desired scans to a queue (`readDataQueue`) for downloading, once a scan is in the queue it is added to `loadedData`.
- `startReaderWorkerPool`

# `startReaderWorkerPool`
Takes the `readDataQueue` and passes it to `workerPool.runTasks`
- `workerPool`
    - `runTasks`
    - `terminateWorkers`
- The `WorkerPool` is from `itk/WorkerPool`.

# `loadFileAndGetData`
- `downloadFile`

# `downloadFile`
- Uses Axios
- `ReaderFactory.downloadFrame`

# `ReaderFactory.downloadFrame`
- `AbortController`
- `getReader`
- `FETCH_DATA`
- `File`

# `ReaderFactory.getReader`
- `READER_MAPPING`

# `FETCH_DATA`
- `readAsArrayBuffer`
    - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
