/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 17:41:15
 * @LastEditTime: 2019-10-16 13:01:12
 * @LastEditors: Please set LastEditors
 */
const jwt = require('jsonwebtoken');
/**
 * Token的生成与校验
 * @param {String} data         加密数据
 * @param {Number} expiresIn    有效期（单位:s）
 */
let {
    secret
} = require('../config.json');

function create(data, expiresIn = 60*60*24*30) { 
    console.log(expiresIn)
    let token = jwt.sign({
        data
    }, secret, {
        expiresIn
    });
    return token;
}
// 验证
function verify(token) {
    // console.log(token)
    let res;
    try {
        let result = jwt.verify(token, secret);
        console.log('token校验：', result)
        res = true;
    } catch (err) {
        res = false;
    }
    return res;
}
module.exports = {
    create,
    verify
}