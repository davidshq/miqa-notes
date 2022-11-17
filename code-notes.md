# Vuex Store
MIQA uses the [direct-vuex](https://github.com/paroi-tech/direct-vuex) npm package to provide TypeScript types, note that this changes the way in which the store can be accessed.

## `getData(frameId, file, webWorker = null)`
- `getData` is called by either `poolFunction` or `loadFileAndGetData`
- `getData` => `poolFunction` => `ReaderFactory`/ `FETCH_DATA` => `downloadFrame`
- `loadFileAndGetData` =>

# `<ExperimentsView.vue>`
- It seems that a mouseover almost anywhere on the Projects View will trigger `<ExperimentsView.vue>` to run:
    1. `getURLForFirstFrameInScan(scanId)`
    2. `ellipsisText(str)`
And that this may be repeated several times - perhaps for each scan?