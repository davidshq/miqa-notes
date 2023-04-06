# Canonical
This follows the canonical code found in `OpenImaging/miqa`, not the code in `davidshq/miqa`. This document is meant as a jumping off point for customization rather than documenting the customization itself.

Note: This document follows the simplest path through the code and does not consider all of the possible paths.

# Starting Point
We start in `Scan.vue` where the Vuex store is called with `swapToFrame`:
```ts
await this.swapToFrame({
    frame,
    onDownloadProgress: this.onDownloadProgress,
});
```

# `swapToFrame`
We'll only look at the core portions of this function, as it includes a number of guard clauses that are not relevant to this discussion.
- `frameCache` is a global variable (map) that is used to cache frames once downloaded.
```ts
async swapToFrame({
    state, dispatch, getters, commit,
}, { frame, onDownloadProgress = null, loadAll = true }) {

    // We use the frame we passed in to look up the parent scan
    const newScan = state.scans[frame.scan];

    // We queue up the scan to be loaded
    queueLoadScan(
        newScan, 3,
    );

    // If we have a proxyManager, shrink it
    shrinkProxyManager(state.proxyManager);
    newProxyManager = true;

    // If we don't have a proxyManager or newProxyManager is true
    // Creates a new instance of vtkProxyManager, part of VTK.js
    state.proxyManager = vtkProxyManager.newInstance({
        proxyConfiguration: proxy,
    }); 
    state.vtkViews = [];

    // Get the active source proxy
    let sourceProxy = state.proxyManager.getActiveSource();
    let needPrep = false

    // If we don't have a valid sourceProxy
    sourceProxy = state.proxyManager.createProxy(
        'Sources',
        'TrivialProducer',
    );
    needPrep = true;

    // Where we store the data related to the frame we are loading
    let frameData = null;
    // Load from cache if we have it
    if (frameCache.has(frame.id)) {
        frameData = frameCache.get(frame.id).frameData;
    } else {
        const result = await loadFileAndGetData(
            frame, { onDownloadProgress },
        );
        frameData = result.frameData;
    }
    // Assign frameData as input data
    sourceProxy.setInputData(frameData);

    // If we don't have views or needPrep is true
    prepareProxyManager(state.proxyManager);
    state.vtkViews = state.proxyManager.getViews();

    // If we don't have views
    state.vtkViews = state.proxyManager.getViews();

    // Logic for window locking
}
```

# `queueLoadScan`
Once again we'll only look at the core logic.
- `readDataQueue` is a global variable that is used to store the frames that need to be loaded.
- `loadedData` is a global variable that is used to store the frames that have been loaded.
    - Note: This is something of a misnomer. The data hasn't been loaded rather it has been added to the queue to be loaded. Might be worth renaming to `queuedData` or something similar.
```ts
function queueLoadScan(scan, loadNext = 0) {
    // Cache all the frames in the selected scan
    store.state.scanFrames[scan.id].forEach(
        (frameId) => {
            readDataQueue.push({
                experimentId: scan.experiment,
                scanId: scan.id,
                frame: store.state.frames[frameId],
            });
        },
    );
    loadedData.push(scan.id);

    // Logic for loading additional scans in the experiment
}
```

# `shrinkProxyManager`
This function is used to remove views from the display and delete the associated view proxies. We don't want the views displaying data from the previous scan/frame.
```ts
function shrinkProxyManager(proxyManager) {
    proxyManager.getViews().forEach((view) => {
        view.setContainer(null);
        proxyManager.deleteProxy(view);
    });

}
```

# `loadFileAndGetData`
This function calls `loadFile` which downloads the frame data. It then calls `getData`  on the downloaded data.
```ts
function loadFileAndGetData(frame, { onDownloadProgress = null } = {}) {
    const loadResult = loadFile(frame, { onDownloadProgress });
    return loadResult.fileP.then((file) => getData(frame.id, file, savedWorker)
        .then(({ webWorker, frameData }) => {
            // We reuse web workers to improve performance
            savedWorker = webWorker;
            return Promise.resolve({ frameData });
        })
        .finally(() => {
            if (savedWorker) {
                savedWorker.terminate();
                savedWorker = null;
            }
        }));
}
```

# `loadFile`
This function immediately returns the frame data if it is in the cache. Otherwise it calls `ReaderFactory.downloadFrame` to download the frame data.
```ts
function loadFile(frame, { onDownloadProgress = null } = {}) {
    if (fileCache.has(frame.id)) {
        return { frameId: frame.id, fileP: fileCache.get(frame.id) };
    }
    let client = apiClient;
    client = axios.create();
    downloadURL = frame.download_url;
    
    const { promise } ReaderFactory.downloadFrame(
        client,
        `image${frame.extension}`,
        downloadURL,
        { onDownloadProgress },
    );
    // Add frame to cache
    fileCache.set(frame.id, promise);
    return { frameId: frame.id, fileP: promise};
}
```

# `getData`
This function calls `readImageArrayBuffer`. `getArrayName`, and `expandScanRange`. It also calls the VTK.js functions `getPointData`, `getArray()`, and `getRange()`.
```ts
function getData(id, file, webWorker = null) {
    return new Promise((resolve, reject) => {
        if (frameCache.has(id)) {
            resolve({ frameData: frameCache.get(id), webWorker });
        } else {
            const filename = file.name;
            const io = new FileReader();

            io.onload = function onLoad() {
                readImageArrayBuffer(webWorker, io.result, fileName)
                    .then(({ webWorker, image }) => {
                        const frameData = convertItkToVtkImage(image, { 
                            scalarArrayName: getArrayName(fileName),
                    });
                    
                    const dataRange = frameData
                        .getPointData()
                        .getArray(0)
                        .getRange();
                    frameCache.set(id, { frameData });
                    // We pass frameId as id
                    expandScanRange(id, dataRange);
                    resolve({ frameData, webWorker });
                    });
            };

            io.readAsArrayBuffer(file);
        }
    });
}
```

# `expandScanRange`
```ts
function expandScanRange(frameId, dataRange) {
    if (frameId in store.state.frames) {
        // Get the scanId using the frameId
        const scanId = store.state.frames[frameId].scan;
        // Get the scan using the scanId
        const scan = store.state.scans[scanId];
        if (scan && dataRange[0] < scan.cumulativeRange[0]) {
            [scan.cumulativeRange[0]] = dataRange;
        }
        if (scan && dataRange[1] > scan.cumulativeRange[1]) {
            [, scan.cumulativeRange[1]] = dataRange;
        }
    }
}
```

# `ReaderFactory.downloadFrame`
This function calls `getReader` and then passes the result into `FETCH_DATA`.
```ts
function downloadFrame(axios, fileName, url, { onDownloadProgress } = {}) {
    const abortController = new AbortController();

    return {
        promise: new Promise((resolve, reject) => {
            const readerMapping = getReader({ fileName });
            const { readMethod } = readerMapping;
            FETCH_DATA[readMethod](axios, url, abortController.signal { onDownloadProgress })
                .then((rawData) => {
                    resolve(new File([rawData], fileName));
                });
        }),
        abortController,
    };
}
```
# `getReader`
```ts
function getReader({ name }) {
    const lowerCaseName = name.toLowerCase();
    const extToUse = Object.keys(READER_MAPPING).find((ext) => lowerCaseName.endsWith(ext));
    return READER_MAPPING[extToUse];
}
```

# `FETCH_DATA`
Actually fetches the frame data.
```ts
const FETCH_DATA = {
    readAsArrayBuffer(axios, url, signal, { onDownloadProgress } = {}) {
        return axios
            .get(url, {
                responseType: 'arraybuffer',
                signal,
                onDownloadProgress,
            })
            .then(( { data} ) => data);
    },
};
```


# `registerReader`
- Is this used? Think this must be called to register reader...but where?
```ts
function registerReader({
    extension,
    name,
    vtkReader,
    readMethod,
    parseMethod,
    fileNameMethod,
    fileSeriesMethod,
    fileSeriesMethod,
    sourceType,
    binary,
}) {
    READER_MAPPING[extension] = {
        name,
        vtkReader,
        readMethod: readMethod || binary ? 'readAsArrayBuffer' : 'readAsText',
        parseMethod: parseMethod || binary ? 'parseAsArrayBuffer' : 'parseAsText',
        fileNameMethod,
        fileSeriesMethod,
        sourceType.
    };
}
```