const router = require('koa-router')()
const { totalData, provinceData } = require('../models/data')

router.prefix("/api")

// 根据 id 查询
router.get('/id', async (ctx, next) => {
    const { id } = ctx.query
    await totalData
        .findById(id)
        .then((result) => {
            ctx.body = { code: 200, data: result }
            console.log(result)
        })
        .catch((err) => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

// 根据日期查询全国数据
router.get('/country', async (ctx, next) => {
    const { time } = ctx.query
    await provinceData
        .find({ provinceName: '中国', "_id.updateTime": time })
        .then((result) => {
            ctx.body = { code: 200, data: result }
        })
        .catch((err) => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

// 根据日期范围查询全国数据
router.get('/china/period', async (ctx, next) => {
    const { start, end } = ctx.query
    await provinceData
        .find({ 
            provinceName: '中国', 
            $and: [
                { '_id.updateTime': { $gte: start } }, 
                { '_id.updateTime': { $lte: end } }
            ] 
        })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

// 根据日期范围查询全国各省数据
router.get('/country/period', async (ctx, next) => {
    const { start, end } = ctx.query
    await provinceData
        .find({ 
            provinceName: { $ne: '中国' }, 
            $and: [
                { '_id.updateTime': { $gte: start } }, 
                { '_id.updateTime': { $lte: end } }
            ] 
        })
        .then((result) => {
            ctx.body = { code: 200, data: result }
        })
        .catch((err) => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

module.exports = router
