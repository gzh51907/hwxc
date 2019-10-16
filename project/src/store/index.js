/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-16 10:56:43
 * @LastEditTime: 2019-10-16 11:22:34
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
// 1. 引入Vuex
import Vuex from 'vuex';
import common from './common';
// 2. 使用（安装）Vuex
Vue.use(Vuex);
// 3. 创建store实例
const store = new Vuex.Store({
    modules: {
        common
    }
});
export default store;