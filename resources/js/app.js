import store from "./store";

require('./bootstrap');
import { createApp } from 'vue';
import App from "./App.vue";

import { VueMaskDirective } from 'v-mask';

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};

import VCalendar from 'v-calendar';

createApp(App)
    .use(store)
    .use(VCalendar)
    .directive('mask', vMaskV3)
    .mount('#app')