const express = require('express');
const Router = express.Router();

// const {
//     mongodb
// } = require('../db');
// const {
//     formatData,
// } = require('../utils');
// const colName = 'hwUsers';

// 查询所有商品
Router.get('/',async (req,res)=>{
    // let result
    // try{
    //     await mongodb.create(colName,[{username,password,regtime:new Date()}]);
    //     result = formatData()
    // }catch(err){
    //     result = formatData({code:0})
    // }
    // res.send(result);
    res.send({id:1,name:'huawei meta30 pro',price:5999} )

})



module.exports = Router;