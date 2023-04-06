- `"eslint-plugin-vuetify": "^1.1.0",`
    - Add to extends in .eslintrc.js before airbnb: `'plugin:vuetify/recommended',`
- `"vuetify": "^2.6.14",`
- Move idle-js, jest, eslint-plugin, parser, typescript, config-typescript, typescript to dev depends
- update eslint depends, remove babel-eslint
- move core-js to main, add babel/eslint-parser
    - Replace babel-eslint with babel/eslint-parser in .eslintrc.js
- Change host to public in vue.config.js and remove port from env
- update webpack to 5.75.0
- Add prettier, including to eslintrc after airbnb
- eslint Add '@vue/typescript/recommended',
    plugins: ['@typescript-eslint', 'prettier'],
    `  settings: {
    'import/resolver': {
      "typescript": {},
      }
    }`
- add eslint-import-resolver-typescript
- add jest
- Remove direct-vuex
- Remove pug
- Jest stuff
- Update Vuex
- Sentry
- playwright


npm prune
remove package-lock.json, node_modules