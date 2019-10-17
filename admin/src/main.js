import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/layui-src/dist/css/layui.css';
import '../node_modules/layui-src/dist/layui.js';
import router from './router';
import axios from 'axios';
Vue.prototype.$axios = axios;

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
import axios from 'axios';
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')