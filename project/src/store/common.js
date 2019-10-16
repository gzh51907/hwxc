<<<<<<< HEAD
import axios from 'axios';

let common = {
    state:{
        user:null
    },
    mutations:{
        login(state,{username,Authorization}){
=======
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-16 11:13:53
 * @LastEditTime: 2019-10-16 11:21:17
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios';
export default {
    state: {
        user: null
    },
    mutations: {
        login(state, {
            username,
            Authorization
        }) {
>>>>>>> yunfei
            state.user = {
                username,
                Authorization
            }
<<<<<<< HEAD
            localStorage.setItem('user',JSON.stringify({username,Authorization}));  
        },
        logout(state){
            state.user = null;
            localStorage.removeItem('user');
        }
    },
    actions:{
        async checkLogin(context,payload){
            let user = localStorage.getItem('user');
            if(!user){
                context.commit('logout');
            }else{
                // 有鉴权，校验是否过期
                user = JSON.parse(user);
                let {data} = await axios.get('http://localhost:1907/verify',{
                    headers:{
                        Authorization:user.Authorization
                    }
                })
                if(data.code === 1){
                    context.commit('login',user);
                }else{
                    context.commit('logout');
                    return 400
                }  
=======
            // 存入本地存储
            localStorage.setItem("user", JSON.stringify({
                username,
                Authorization
            }));
        },
        logout(state) {
            state.user = null;
            // 清空本地存储
            localStorage.removeItem("user");
        }
    },
    actions: {
        async checkLogin(context, payload) {
            let user = localStorage.getItem("user");
            if (!user) {
                context.commit('logout');
            } else {
                user = JSON.parse(user);
                // 发起ajax请求，校验token是否过期
                let {
                    data
                } = await axios.get('http://localhost:1907/verify', {
                    headers: {
                        Authorization: user.Authorization
                    }
                })
                // 放置刷新vuex数据丢失的问题
                if (data.code === 1) {
                    context.commit('login', user);
                } else {
                    context.commit('logout');
                    return 400
                }
>>>>>>> yunfei
            }
            return 200;
        }
    }
<<<<<<< HEAD
}

export default common
=======
}
>>>>>>> yunfei
