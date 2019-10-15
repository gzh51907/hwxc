import axios from 'axios';

let common = {
    state:{
        user:null
    },
    mutations:{
        login(state,{username,Authorization}){
            state.user = {
                username,
                Authorization
            }
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
            }
            return 200;
        }
    }
}

export default common