import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import goodsInf from '../pages/goodsInf.vue';
import userInf from '../pages/userInf.vue';
import addUser from '../pages/addUser.vue';
import userOrder from '../pages/userOrder.vue';
import addGoods from '../pages/addGoods.vue'

let router = new VueRouter({
    mode:'history',
    routes: [
        //添加商品
        {
            name: 'goodsInf',
            path: '/goodsInf',
            component: goodsInf
        },
        {
            name: 'userInf',
            path: '/userInf',
            component: userInf
        },
        {
            name: 'addUser',
            path: '/addUser',
            component: addUser
        },
        {
            name: 'userOrder',
            path: '/userOrder',
            component: userOrder
        },
        {
            name : 'addGoods',
            path : '/addGoods',
            component:addGoods
        }
    ]
})
export default router;