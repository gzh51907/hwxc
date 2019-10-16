import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;


import  '../node_modules/layui-src/src/css/layui.css';
import  '../node_modules/layui-src/src/layui.js';
import router from './router';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')