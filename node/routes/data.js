const router = require('koa-router')()
const { totalData, provinceData } = require('../models/data')
const { parseDaily } = require('../utils/parseDaily')
const { parseData } = require('../utils/parseData')

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
router.get('/china/daily', async (ctx, next) => {
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
            const retVal = parseDaily(result)
            ctx.body = { code: 200, data: retVal }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

// 根据日期范围查询全国各省数据
router.get('/country/period', async (ctx, next) => {
    let { start, end } = ctx.query
    start = start || '2022-04-19'
    end = end || '2022-04-19'
    await provinceData
        .find({
            provinceName: { $ne: '中国' },
            $and: [
                { '_id.updateTime': { $gte: start } },
                { '_id.updateTime': { $lte: end } }
            ]
        })
        .sort({ updateTime: 1 })
        .then((result) => {
            const retVal = parseData(result, 'province')
            ctx.body = { code: 200, data: retVal }
        })
        .catch((err) => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

// 查询全国省份各市数据
router.get('/province/period', async (ctx, next) => {
    let { code, start, end } = ctx.query
    start = start || '2022-04-19'
    end = end || '2022-04-19'
    code = code ? Number(code) : 110000
    console.log(code, start, end)

    await totalData
        .find({
            $and: [
                { province_zipCode: { $eq: code } },
                { cityName: { $ne: '' } },
                { updateTime: { $gte: start } },
                { updateTime: { $lte: end } }
            ],
        })
        // .limit(5)
        .sort({ updateTime: 1 })
        .then((result) => {
            const retVal = parseData(result, 'city')
            ctx.body = { code: 200, data: retVal }
        })
        .catch((err) => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

router.get('/province/daily', async (ctx, next) => {
    let { code, start, end } = ctx.query
    start = start || '2022-04-19'
    end = end || '2022-04-19'
    code = code ? Number(code) : 110000
    console.log(code, start, end)

    await provinceData
        .find({
            province_zipCode: code,
            $and: [
                { '_id.updateTime': { $gte: start } },
                { '_id.updateTime': { $lte: end } }
            ]
        })
        .then(result => {
            const retVal = parseDaily(result)
            ctx.body = { code: 200, data: retVal }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

router.get('/china/display', async (ctx, next) => {
    const { start, end } = ctx.query
    await provinceData
        .find({
            provinceName: '中国',
            $and: [
                { '_id.updateTime': { $gte: start } },
                { '_id.updateTime': { $lte: end } }
            ]
        })
        .sort({ updateTime: -1 })
        .limit(1)
        .then((result) => {
            if (result.length === 0) {
                ctx.body = { code: 400, msg: '查询结果为空' }
            }
            const retVal = {
                updateTime: result[0].updateTime,
                province_confirmedCount: result[0].province_confirmedCount,
                province_suspectedCount: result[0].province_suspectedCount,
                province_curedCount: result[0].province_curedCount,
                province_deadCount: result[0].province_deadCount,
            }
            ctx.body = { code: 200, data: retVal }
        })
        .catch((err) => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

router.get('/province/display', async (ctx, next) => {
    let { start, end, code } = ctx.query
    start = start || '2022-04-19'
    end = end || '2022-04-19'
    code = code ? Number(code) : 110000
    console.log(code, start, end)

    await provinceData
        .find({
            province_zipCode: code,
            $and: [
                { '_id.updateTime': { $gte: start } },
                { '_id.updateTime': { $lte: end } }
            ]
        })
        .sort({ updateTime: -1 })
        .limit(1)
        .then((result) => {
            console.log(result)
            if (result.length === 0) {
                ctx.body = { code: 400, msg: '查询结果为空' }
                return
            }
            const retVal = {
                updateTime: result[0].updateTime,
                province_confirmedCount: result[0].province_confirmedCount,
                province_suspectedCount: result[0].province_suspectedCount,
                province_curedCount: result[0].province_curedCount,
                province_deadCount: result[0].province_deadCount,
            }
            ctx.body = { code: 200, data: retVal }
        })
        .catch((err) => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

module.exports = router
