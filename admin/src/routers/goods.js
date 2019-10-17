const express = require('express');
const Router = express.Router();

const {
    mongodb
} = require('../db');
const {
    formatData,
} = require('../utils');
const colName = 'goodslist';


// 查询所有商品
Router.get('/', async (req, res) => {
    let result
    try {
        result = await mongodb.find(colName, req.query);
    } catch (err) {
        result = formatData({
            code: "0"
        })
    }
    res.send(result);
})

// 查询单个商品
Router.get('/getgoods', async (req, res) => {
    let {
        barcode
    } = req.query;
    let result;
    try {
        result = await mongodb.find(colName, {
            barcode: parseInt(barcode)
        });
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
Router.post('/reg', async (req, res) => {
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


})
// 删除单个商品
Router.patch("/dele", async (req, res) => {
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

// 修改商品
// Router.update('/update', async (req, res) => {
//     // console.log(req.query, req.body)
//     let result = await mongodb.update(colName,
//         req.query,
//         req.body
//     );
//     res.send(result);
// })
// 修改商品.
Router.patch('/:barcode', async (req, res) => {
    console.log(req,res)
    let barcode = req.params.barcode;
    console.log(req,res,barcode);
    res.send({barcode,productName:'供医疗卫生清洁时使用。',guidePrice:6.5})
    let result = await mongodb.update(colName,
        req.query,
        req.body
    );
    res.send(result);    
});

module.exports = Router;