1. Install Vue CLI
2. `vue create vuetest`
    - Use class components
    - Use Vuex, Router
    - Use Babel, TypeScript, SCSS
3. Add Vuetify: `vue add vuetify`
    - Configure Vue CLI (advanced)
    - Ended up with default options
    - Receive wrning: "conflicting version for project dependency 'sass-loader'", apparently 12.0.0 is injected by undefined while 10.0.0 is injected by vuetify.
    - Receive error: "Missing file extension 'vue' for './components/HelloWorld"
4. Add Vue Composition API: `npm i @vue/composition-api`