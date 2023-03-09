The initial MIQA project has tests for the Python/Django backend but not for the JS/TS/Vue front-end. This document outlines the addition of tests for the front-end.

1. `vue add unit-jest`
2. Rollback changes to files made by vue linting.


1. It was necessary to install the Vue CLI on miqa-npm-1: `npm i -g @vue/cli`
2. Vue CLI can then be used to add Jest, Vue Test Utils, and the various components that are needed to integrate with Jest/Vue: `vue add unit-jest`
3. Note that running this command runs linting on the project, you may want to revert the changes it makes to the code.
4. If one then attempts to run `npm run test:unit` one receives an error message:
> Validator Error:
> Module vue-jest in the transform option was not found.
>  <rootDir> is: /opt/client
5. We can install `vue-jest` using `npm i -D vue-jest`
6. At some point we swap over to following the Vue Testing Handbook as it seems to provide more complete instructions and is focused on Vue 2.x: https://lmiller1990.github.io/vue-testing-handbook/
7. Update the `jest.config.js` file to include the config specified here: https://lmiller1990.github.io/vue-testing-handbook/setting-up-for-tdd.html#modify-your-jest-config-file
8. Note: `jest.init.js` is not auto-created, so we can manually add an empty `jest.init.js` file in the root folder. Failing to do so will result in Jest errors.
9. Running `npm run test:unit` fails, this time with an error regarding Babel. It indicates we are using 6.26.3 and Jest needs 7.0.0-0 or greater.
10. Lets take a moment to update `caniuse-lite` so we stop getting messages about it being outdated: `npx browserslist@latest --update-db`.
11. Replace `babel-eslint` with `@babel/eslint-parser`: `npm remove babel-eslint && npm i -D @babel/eslint-parser`
12. Update some Vue CLI plugins: `npm i -D @vue/cli-plugin-babel@5.0.8 @vue/cli-plugin-eslint@5.0.8 @vue/cli-plugin-unit-test@5.0.8`
