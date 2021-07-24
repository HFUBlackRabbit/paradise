import store from "./store";

require('./bootstrap');
import { createApp } from 'vue';
import App from "./App.vue";

createApp(App)
    .use(store)
    .mount('#app')