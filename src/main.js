// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.prototype.$axios = axios;
new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    render: (h) => h(App)
})
