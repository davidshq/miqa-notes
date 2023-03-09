# MIQA Specific
- Add `"SET NODE_OPTIONS=--openssl-legacy-provider &&"` to start of `start` in `package.json` so that we don't get errors about SSL.
- We start with no errors in browser console.

# Clean Up Dependencies
- Remove `@sentry/vue`, it will cause errors otherwise (could probably also upgrade).
    - Remove sentry related code in `main.ts`
- Move dev dependencies into devDependencies, to avoid any issues, move exact versions:
    - `types/idle-js`
    - `@typescript-eslint/eslint-plugin`
    - `@typescript-eslint/parser`
    - `@vue/cli-plugin-typescript`
    - `@vue/eslint-config-typescript`
- Remove `@types/jest`, `@vue/eslint-config-prettier`, it isn't actually being used.
