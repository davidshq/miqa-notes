The @girder/oauth-client module is configured to error out if one tries to use it "insecurely" - which is what happens when we are using Jest. To fix this you'll need to go into `node_modules/@girder/oauth-client` and edit `src/oauth-client.ts` and `dist/oauth-client.js` and comment out the following lines:
```js
if (!window.isSecureContext) {
    throw Error('OAuth Client cannot operate within insecure contexts.');
}
```

Once this is done this error should no longer cause Jest tests to fail.