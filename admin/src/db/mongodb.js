/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 13:58:12
 * @LastEditTime: 2019-10-16 14:01:49
 * @LastEditors: Please set LastEditors
 */
// 引入并解构
const {
    MongoClient
} = require('mongodb');
// 引入公共部分
const {
    DBurl,
    DBName
} = require('../config.json');
// 连接MongoDB
async function connect() {
    let result;
    try {
        let client = await MongoClient.connect(DBurl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // 连接数据库
        let db = client.db(DBName);

        result = {
            client,
            db
        }
    } catch (err) {
        result = err
    }
    return result

}
/**
 * 增
 * @param {String} colName  集合名称
 * @param {Array} data     要添加的数据
 */
async function create(colName, data) {
    let {
        db,
        client
    } = await connect();
    // 获取集合
    let col = db.collection(colName);
    let result = await col.insertMany(data);
    client.close();
    return result
}

/**
 * 删
 * @param {String} colName 
 * @param {Object} query 
 */
async function remove(colName, query) {
    let {
        db,
        client
    } = await connect();
    // 获取集合
    let col = db.collection(colName);
    let result = await col.deleteMany(query);
    client.close();
    
    return result;
}

/**
 * 改
 * @param {String} colName 
 * @param {Object} query 
 * @param {Object} data     需要修改的数据
 */
async function update(colName, query, data) {
    let {
        db,
        client
    } = await connect();
    // 获取集合
    let col = db.collection(colName);
    let result = await col.updateMany(query, data);
    client.close();
    return result;
}

/**
 * 查
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */
async function find(colName, query = {}) {

    let {
        db,
        client
    } = await connect();
    let col = db.collection(colName);

    // 查询数据库
    let result = await col.find(query).toArray();

    // 关闭数据库连接
    client.close();
    //返回结果
    return result;
}

module.exports = {
    find,
    create,
    remove,
    update
}