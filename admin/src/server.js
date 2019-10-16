/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 21:59:20
 * @LastEditTime: 2019-10-15 22:22:06
 * @LastEditors: Please set LastEditors
 */
const express = require('express');
const app = express();
// json引入
const {
    PORT
} = require('./config.json');
// 引入所有的路由
const allRouter = require('./routers');
// 使用路由
app.use(allRouter);
// 静态资源服务器（缓存7天）
app.use(express.static('./'))
// 监听
app.listen(PORT, () => {
    window.console.log("服务器启动成功");
});