import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import axios from 'axios';
import VueTheMask from 'vue-the-mask';
Vue.config.productionTip = false;

Vue.use({
    install(Vue) {
        Vue.prototype.$api = axios.create({
            baseURL: 'http://localhost:8081/api/'
        });
    }
});

Vue.use(VueTheMask);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
