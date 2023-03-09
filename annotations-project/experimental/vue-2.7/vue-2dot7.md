1. Install VueDemi: `npm i vue-demi`
    - Instructions seem to assume this is installed, but it isn't in MIQA, see: https://github.com/vueuse/vue-demi
2. Update `@vue/cli-service` from `^4.5.13` to `~4.5.18`
3. Update Vue from `^2.6.14` to `^2.7.0`
    - Do not remove `vue-template-compiler` as we intend to use `@vue/test-utils`.
4. Due to outdated (`15.9.8`) `vue-loader` dependency, remove `node_modules` folder and `package-lock.json` and re-install dependencies: `npm i`.
5. Remove `@vue/composition-api` as it is not compatible with Vue 2.7.x: `npm remove @vue/composition-api`.
6. Update imports from `@vue/composition-api` to `vue`.
    - This isn't quite so simple, one has to extract a number out of `{ something, something } from 'vue'` to be `something from 'vue'`.
7. TypeScript fails build on errors, have to make a number of code changes to resolve TS errors.
8. Update `vue-template-compiler` to match `vue` version. In this case from `"^2.6.14"` to `"^2.7.0"`.


# TODO:
- [ ] Check type of `frame_evaluation` and update TS def.
- [ ] Review `UserAvatar` `hashCode`, seems like there should be an easier way to do this.