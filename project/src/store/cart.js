import axios from 'axios';
import {Message} from 'element-ui';

let cart = {
    state:{
        cartlist:[]
    },
    getters:{
        cartlength(state){
            return state.cartlist.length;
        },
        allprice(state){
            return state.cartlist.reduce((prev,item)=>prev + item.price * item.num,0);
        },
        allnum(state){
            return state.cartlist.reduce((prev,item)=>prev +  item.num,0);
        }
    },
    mutations:{
        add2cart(state,goods){
            state.cartlist.unshift(goods);
        },
        remove(state,id){
            state.cartlist = state.cartlist.filter(item=>item.id != id);
        },
        clearCart(state,{id,num}){
            state.cartlist = [];
        },
        chengeNum(state,{id,num}){
            state.cartlist.forEach(item=>{
                if(item.id === id){
                    item.num = num;
                }
            })
        }
    },
    actions:{
        // 库存对比请求
        async changeNumAsync(context,{id,num}){
            let {data} = await axios.get('http://localhost:1907/goods/kucun')
            let kucun = data.data;
            if(num <= kucun){
                context.commit('changeNum',{id,num})
            }else{
                Message.error('当前库存不足');
                context.commit('changeNum',{id,num:kuncun})
            }
        }
    }
}

export default cart;