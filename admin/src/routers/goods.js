const express = require('express');
const Router = express.Router();

const {
    mongodb
} = require('../db');
const {
    formatData,
} = require('../utils');
const colName = 'goodslist';


// 商品分页,一次渲染十条
Router.post('/goodspage', async (req, res) => {
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


// 查询所有商品
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

// 查询单个商品
Router.get('/getgoods', async (req, res, ) => {
    let {
        barcode
    } = req.query;
    let result;
    try {
        result = await mongodb.find(colName, {
            barcode: parseInt(barcode)
        }, null);
        if (result.length > 0) {
            result;
        } else {
            result = formatData({
                code: "0"
            })
        }
    } catch {
        result = formatData({
            code: "0"
        })
    }
    res.send(result);
})

// 添加商品
Router.post('/add', async (req, res) => {
    let {
        id,
        categoryName,
        productName,
        barcode,
        picUrl,
        efficacy,
        guidePrice
    } = req.body;
    let result;
    try {
        await mongodb.create(colName, [{
            id,
            categoryName,
            productName,
            barcode,
            picUrl,
            efficacy,
            guidePrice
        }]);
        result = formatData();
    } catch (err) {
        result = formatData({
            code: 0
        })
    }
    res.send(result);
});

// 删除单个商品
Router.delete("/dele", async (req, res) => {
    // console.log('barcode',req.query)
    let {
        barcode
    } = req.query;
    let result;
    try {
        result = await mongodb.remove(colName, {
            barcode: parseInt(barcode)
        })
        result = formatData()
    } catch {
        result = formatData({
            code: "0"
        })
    }
    res.send(result);
})

// 修改商品.
Router.patch('/change', async (req, res) => {
    let id = req.query.barcode * 1;
    req.query.barcode = id;
    let result = await mongodb.update(colName, req.query, req.body
    );
    res.send(result);
});

module.exports = Router;