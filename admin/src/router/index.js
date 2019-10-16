import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Addgoods from '../pages/Addgoods.vue';


let router = new VueRouter({
    routes: [
        //添加商品
        {
            name: 'addgoods',
            path: '/addgoods',
            component: Addgoods
        }

    ]
})
export default router;