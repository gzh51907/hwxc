/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 17:37:39
 * @LastEditTime: 2019-10-16 06:22:07
 * @LastEditors: Please set LastEditors
 */
const express = require('express');
const Router = express.Router();

const {
    formatData,
    token
} = require('../utils');

// 允许跨越
Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
});

//引入路由模块
const userRouter = require('./user');

Router.use(express.urlencoded({
    extended: true
}), express.json());

Router.use('/user', userRouter);
Router.get('/verify', (req, res) => {
    let Authorization = req.get('Authorization');
    // 校验token的有效性
    let result = token.verify(Authorization);
    res.send(formatData({
        code: result ? 1 : 0
    }))
})

module.exports = Router;