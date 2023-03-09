# Plan of Attack:
1. Correct dependencies
2. Upgrade Vue, Vuex, Vue CLI
3. Upgrade Vuetify

# Clean Up Dependencies
- See `vue3-miqa-specific.md`

# Upgrade Vue
- https://v3-migration.vuejs.org/migration-build.html
- Perform a `vue upgrade` to upgrade Vue CLI and plugins (to 5.0.8).
- This should update `@vue/cli-plugin` `-babel`, `-eslint`, `-typescript` as well as `@@vue/cli-service`, `vue-cli-plugin-vuetify`, and `typescript`.
- Update `package.json` Vue versions:
    - "vue": "^3.2.47"
    - 
    - Remove vue-template-compiler
- While the instructions seem to indicate "@vue/compiler-sfc" can be changed at the same time as upgrade Vue/removing vue-template-compiler, I had to do it in two steps. So now add to your `package.json` "@vue/compiler-sfc": "^3.2.47"
- Update the `vue.config.js` `chainWebpack` section to use `@vue/compat` as an alias for `vue`:
```js
   config.resolve.alias.set('vue', '@vue/compat');

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      }));
```
- Update `shims-vue.d.ts` (for TypeScript support):
```ts
declare module 'vue' {
  import { CompatVue } from '@vue/runtime-dom'
  const Vue: CompatVue
  export default Vue
  export * from '@vue/runtime-dom'
  const { configureCompat } = Vue
  export { configureCompat }
}
```

# Upgrade Vuex
- https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#installation-process
- Update dependency in `package.json` to `"^4.1.0"`

# Upgrade Webpack
- https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/webpack-plugin
- Vuetify will fail to install (webpack-plugin-vuetify) if this isn't upgraded first:
- Upgrade webpack version in `package.json` to ^5.75.0
- Update `vue.config.js` to use `webpack-plugin-vuetify`:
```ts
const { VuetifyPlugin } = require('webpack-plugin-vuetify');

// In plugins:
 new VuetifyPlugin({ autoImport: true }),
```

# Upgrade Vuetify
- Use `npm i vuetify@"^3.1.4"`
- Replace `vuetify-loader` with `webpack-plugin-vuetify` (former definitely doesn't work with vue 3.x).

- Update `main.ts` with (which replaces all current Vuetify references in the file):
```ts
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
```
- Do not follow upgrade instructions, follow install: https://vuetifyjs.com/en/getting-started/installation/

- At this point we have the notorious "TypeError: Cannot read properties of undefined (reading 'vuetify')" from `vue-cli-plugin-vuetify\index.js:29:54`.