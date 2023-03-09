1. Update `package.json`
2. `vue upgrade`
3. Must upgrade vue to 3 and do `npm i` before adding `@vue/compat`
4. Update shims-vue.d.ts with 4
5. Add Vuetify: `vue add vuetify`
6. Update webpack to 5.x
7. Change public to host, address to 127.0.0.1
8. Update eslint to 8.0.0
9. Install `eslint-plugin-vuetify`
10. Update extends to:
```js
  extends: [
    'plugin:vue/recommended',
    'plugin:vuetify/base',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
```



=====
1. Simplify the project by removing dependencies to avoid inter-dependency problems, can re-add later:
    - @vue/eslint-config-airbnb (also remove from `extends` in `.eslintrc.js`)
    - @vue/eslint-config-prettier
    - babel-eslint (also remove `js: 'babel-eslint'` from `.eslintrc.js`)
7. Update `eslint` to ^8.34.0
8. Update Vuetify using `npm i vuetify@latest`
9. To update `eslint-plugin-vuetify` first remove and the install fresh:
    - `npm remove eslint-plugin-vuetify`
    - `npm i eslint-plugin-vuetify`
10. Reinstall `@typescript-eslint/parser`
11. Use eslint to find and fix Vuetify issues from upgrade, for example:
    - ESLint: 'item-text' has been replaced with 'item-title'
    - ESLint: 'text' has been replaced with 'variant="text"'
    - ESLint: 'top' has been replaced with 'location="top"'
    - ESLint: 'left' has been replaced with 'location="left"'
    - ESLint: 'right' has been replaced with 'location="right"'
    - ESLint: 'bottom' has been replaced with 'location="bottom"'
    - ESLint: 'small' has been replaced with 'size="small"'
    - ESLint: 'large' has been replaced with 'size="large"'
    - ESLint: 'outlined' has been replaced with 'variant="outlined"'
    - ESLint: 'title' has been replaced with 'rounded="0"'
    - ESLint: 'filled' has been replaced with 'variant="filled"'
    - ESLint: 'primary' has been replaced with 'bg-primary'
    - ESLint: 'red--text' has been replaced with 'text-red'
    - ESLint: 'grey--text' has been replaced with 'text-grey'
    - ESLint: 'white--text' has been replaced with 'text-white'
    - ESLint: 'grey--text text--darken-3' has been replaced with 'text-grey-darken-3'
    - ESLint: 'red darken-2' has been replaced with 'red-darken-2'
    - ESLint: 'blue darken-2' has been replaced with 'blue-darken-2'
    - ESLint: 'grey lighten-4' has been replaced with 'bg-grey-lighten-4'
    - ESLint: 'grey lighten-2' has been replaced with 'bg-grey-lighten-2'
    - ESLint: 'black lighten-1' has been replaced with 'black-lighten-1'
    - ESLint: 'green' has been replaced with 'bg-green'
    - ESLint: 'red' has been replaced with 'bg-red'
    - ESLint: 'value' has been replaced with 'model-value'
    - ESLint: 'background-color' has been replaced with 'bg-color'
    - ESLint: 'depressed' has been replacedd with 'variant="flat"'
    - ESLint: 'ticks' has been replaced with 'show-ticks'
    - ESLint: VTextarea: @input has been replaced with @update:modelValue
    - ESLint: VSwitch: @change has been replaced with @update:modelvalue
    - ESLint: VSlider: @input has been replaced with @update:modelValue
    - ESLint: VDialog: @input has been replaced with @update:modelValue
    - ESLint: VCombobox: @input has been replaced with @update:modelValue
    - ESLint: VTextField: @input has been replaced with @update:modelValue
    - ESLint: VSelect: @input has been replaced with @update:modelValue
    - ESLint: VChip: @input has been replaced with @update:modelValue
    - ESLint: 'deletable-chips' has been replaced with 'closable-chips'
    - ESLint: 'input-value' has been replaced with 'model-value'
    - ESLint: 'close' has been replaced with 'closable'
    - ESLint: 'active-class' has been replaced with 'selected-class'
12. In general, if an item has been removed, leave as is rather than removing it, for example:
    - ESLint: 'text-color' has been removed
    - ESLint: 'height' has been removed
    - ESLint: 'fab' has been removed
    - ESLint: 'small-chips' has been removed
    - ESLint: 'app' has been removed
    - ESLint: 'max-height' has been removed
13. But in the case of `v-data-table` I'd recommend commenting out if possible for the moment.
14. If you have `v-list-item-group` you can remove it and instead add to each `v-list-item` (formerly within `v-list-item-group`): `v-model="selected"` where 'selected' is the name of the `v-model` formerly attached to `v-list-item-group`.
    - If styling, replace with a `<div>` and attach styling.
15. Remove `vuetify-loader` and replace with `webpack-plugin-vuetify` (former definitely doesn't work with vue 3.x)
16. Replace `Vuetify` class (in `main.js`) with `createVuetify` function:
```js
// Remove: import Vuetify from 'vuetify';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
Vue.use(vuetify);
loadFonts();
```
17. Remove `shims-vuetify.d.ts`
18. Add plugins folder with `vuetify.ts` file:
```ts
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
});
```
17. Add a `webfontloader.ts` file to the plugins folder:
```ts
export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader');

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  });
}
```
18. Add webfontloader to `package.json`: `npm i webfontloader` and it's types to dependencies: `@types/webfontloader`
19. Add to `vue.config.js`:
```js
transpileDependencies: [
  'vuetify'
]
```
20. Oops, re-add `shims-vuetify.d.ts`:
```ts
declare module 'vuetify/lib/framework' {
  import Vuetify from 'vuetify';

  export default Vuetify;
}
```
21. Remove `core-js` then reinstall in main dependencies if not already ("^3.8.3")
22. Re-add `@typescript-eslint/eslint-plugin`
23. Update `eslint-plugin-vue` to ^9.0.0
24. Re-add `@vue/eslint-config-typescript`
26. Add to `shims-vue.d.ts`:
```ts
declare module '*.vue' {
  import { Component } from 'vue';
  var component: Component;

  export default component;
}
```
27. Update `vuetify.ts` to:
```ts
import { createVuetify } from 'vuetify'

export default createVuetify({
});
```
27. Delete `package-lock.json`
28. Delete `node_modules`
29. Run `npm install`
30. Remove `@vue/composition-api` and remove references in `main.ts`
31. Update `vuex` to ^4.1.0
32. Remove `vue-async-computed`
33. Remove `vue-css-donut-chart`
34. Remove `vue-cli-plugin-vuetify`
34. Update `vue.config.js` from `public` to `host: "127.0.0.1"`
35. Temporarily use `@ts-ignore` to get around stricter TS rules.
36. Add `'@vue/typescript/recommended'` to `extends` in `.eslintrc.js`
37. Replace `@vue/composition-api` with `vue`.
38. Force reinstall `vue-css-donut-chart` and `vue-async-computed`
40. Change imports using `vuetify/lib` to `vuetify/components` when components.
41. Remove `.extend` from exports when extending components, instead add `extends: VRangeSlider,`
42. Remove refs to VueCompositionAPI in `main.ts`
43. Make necessary changes to Vuex:
44. Remove `direct-vuex`
45. Re-add `vue-cli-plugin-vuetify`
46. Add under configureWebpack `new VuetifyPlugin({ autoImport: true }),`, import as `const { VuetifyPlugin } = require('webpack-plugin-vuetify');`
47. Check .eslintrc.js
48. Remove shims-vuetify.d.ts
49. Remove jest from types in tsconfig.json
50. Upgrade typescript to ^4.9.5