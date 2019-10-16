/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 17:00:43
 * @LastEditTime: 2019-10-16 10:46:43
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import router from './router';
import ElementUI from 'element-ui';
import store from './store';
import './css/base.css';
import 'amfe-flexible';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
import axios from 'axios';
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')