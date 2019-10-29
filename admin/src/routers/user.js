/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 19:09:11
 * @LastEditTime: 2019-10-16 13:02:01
 * @LastEditors: Please set LastEditors
 */
/**
 * 用户CRUD
 * 增：C（Create）
 * 删：D（Delete）
 * 改：U（Update）
 * 查：R（Retrieve）
 */
const express = require('express');
const Router = express.Router();
const {
    mongodb
} = require('../db');
const {
    formatData,
    token
} = require('../utils');
const colName = 'hwUsers';

// 注册
Router.post('/reg', async (req, res) => {
    let {
        username,
        password
    } = req.body;
    let result
    try {
        await mongodb.create(colName, [{
            username,
            password,
            regtime: new Date()
        }]);
        result = formatData()
    } catch (err) {
        result = formatData({
            code: 0
        })
    }
    res.send(result);
})

Router.get('/check', async (req, res) => {
    let {
        username
    } = req.query;

    let result = await mongodb.find(colName, {
        username
    },null);
    if (result.length) {
        res.send(formatData({
            code: 0
        }))
    } else {
        res.send(formatData());
    }
})

// 登录
Router.get('/login', async (req, res) => {
    let {
        username,
        password,
        mdl
    } = req.query;
    let result = await mongodb.find(colName, {
        username,
        password
    },null);
    if (result.length > 0) {
        let Authorization
        if (mdl) {
            Authorization = token.create(username)
        }
        Authorization = token.create(username)
        res.send(formatData({
            data: Authorization
        }));
    } else {
        res.send(formatData({
            code: 0
        }))
    }
})

// 用户分页,一次渲染十个.
Router.post('/userpage', async (req, res) => {
    console.log('body', req.body)
    let result;
    try {
        result = await mongodb.find(colName, req.query, req.body)

    } catch {
        result = formatData({
            code: "0"
        })
    }
    res.send(result);
})

// 查询所有用户
Router.get('/', async (req, res) => {
    let result
    try {
        result = await mongodb.find(colName, req.query, null);
    } catch (err) {
        result = formatData({
            code: "0"
        })
    }
    res.send(result);
})

// 删除用户
Router.post("/dele", async (req, res) => {
    let {
        username
    } = req.body;
    console.log("后台接收", username)
    let result;
    try {
        result = await mongodb.remove(colName, {
            username: username
        })
        result = formatData()
    } catch {
        result = formatData({
            code: "0"
        })
    }
    res.send(result);
})
module.exports = Router;