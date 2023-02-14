# Introduction
The goal is to add support for multiple proxy managers to be operating simultaneously side-by-side. This will allow us to display multiple different images simultaneously.

Note: Theoretically this could be accomplished using a single proxymamager but the documentation for this is not clear and for a quick prototype multiple proxymanagers should work without issues.

# The Process
Instead of the Vuex state property `proxyManager` holding a proxyManager object directly we'll make it so that `proxyManager` is an array that can contain multiple proxyManager objects.

We'll then work through the Vuex store and as needed modify code that interacts with `proxyManager` to take a parameter that specifies which proxyManager to use.

# The Code
This work is being done on the support-multiple-proxy-managers branch.

# TODO:
- [X] Make sure functions calling `getView()` pass in the correct proxy manager instance.
- [X] Rewrite `selectedScanx` in `CompareScans.vue` to use array of proxy managers instead of single proxy manager.

# Changes Made
- Add parameter `whichProxy` that defaults to `0`.
- Instead of directly accessing `proxyManager` we'll use `proxyManager[whichProxy]`.
- Specify `whichProxy` when calling `proxyManager` from `ControlPanel.vue`.
- Add `loadFrame` function to use instead of `swapToFrame` when working with multiple proxy managers.

# Not Needed
- `prepareProxyManager` - The functions calling this function pass in a specific proxyManager, so we don't need to do anything here.
- `shrinkProxyManager` - The functions calling this function pass in a specific proxyManager, so we don't need to do anything here.

## Done
- `store.ts`
    - `setupProxyManager`
    - `setupSourceProxy`
    - `SET_SLICE_LOCATION`
    - `swapToFrame`
- Vue Components
    - `ControlPanel.vue`
    - `ControlPanelDecision.vue`
    - `VtkViewer.vue`
