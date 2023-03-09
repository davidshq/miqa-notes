By default Node does not compile node modules expecting them to be in compiled form, however this is not always the case.

When running Jest tests that utilize the Vuex store one is likely to run into some issues with a few modules. You can tell Node to compile the code in these modules by adding the following to `jest.config.js`:
```js
  transformIgnorePatterns: [
    "node_modules/(?!(vtk.js|itk|@girder/oauth-client|django-s3-file-field|d3-scale|d3-array|internmap|d3-.*)/)"
  ],
```

In addition, Jest does not natively support a lot of file types and some of these are present in our node_modules. To fix this we'll add the following to the jest.config.js file:
```js
  "moduleNameMapper": {
    "^.+.(vert|frag|glsl)$": "jest-transform-stub",
  },
```

Note that you'll also need to install the dependency `jest-transform-stub` for this to work:

`npm i -D jest-transform-stub`