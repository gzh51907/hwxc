/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 17:00:43
 * @LastEditTime: 2019-10-16 10:20:43
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';

// 使用VueRouter步骤
// 1.引入vue-router
import VueRouter from 'vue-router';

// 2.使用(安装)vue-router（VueRouter是作为插件增强Vue的功能）
Vue.use(VueRouter);

// 引入页面组件
import Home from '../pages/Home.vue';
import Cart from '../pages/Cart.vue';
import Reg from '../pages/Reg.vue';
import Login from '../pages/Login.vue';
import NotFound from '../pages/NotFound.vue';
import Sort from '../pages/Sort.vue';
import Mine from '../pages/Mine.vue';
import Goods from '../pages/Goods.vue';
import store from '../store';


// 3. 实例化router并配置参数
let router = new VueRouter({
    // mode:'hash',
    // mode: 'history',
    // 配置参数：不同的 URL 显示不同的内容
    routes: [
        // 首页
        {
            name: 'home',
            path: '/home', //当浏览器地址为/home时，显示Home组件的内容
            component: Home
        },
        {
            path: '/', //当浏览器地址为/home时，显示Home组件的内容
            redirect: '/home'
        },
        // 购物车
        {
            name: 'cart',
            path: '/cart',
            component: Cart,
            meta: {
                requiresAuth: true
            }
        },
        
        // 动态路由
        {
            name: 'sort',
            path: '/sort/:id',
            component: Sort
        },
        {
            name: 'goods',
            path: '/goods/:barcode',
            component: Goods
        },
        {
            name: 'mine',
            path: '/mine',
            component: Mine,
            meta: {
                requiresAuth: true
            }
        },
        {
            name: 'reg',
            path: '/reg',
            component: Reg
        }, {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            path: '/404',
            component: NotFound
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
router.beforeEach(async function(to,from,next){

    // 在全局路由守卫beforeEach中进行页面权限访问控制
    // 先判断目标路由是否需要鉴权
    if(to.meta.requiresAuth){
        let user = localStorage.getItem('user');
        if(user){
            let res = await store.dispatch('checkLogin');
            console.log('res:',res)
            if(res === 400){
                next({
                    path:'/login',
                    query:{
                        targetUrl:to.fullPath
                    }
                });
            }else{
                next();
            }
        }else{
            router.push({
                path:'/login',
                query:{
                    targetUrl:to.fullPath
                }
            });
        }
    }else{
        next();
    }

})

// 5.在组件中使用VueRouter
export default router;