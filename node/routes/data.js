const router = require('koa-router')()
const { totalData, provinceData } = require('../models/data')

router.prefix("/api")

function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return null
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array.findIndex(it => it.name === arr[i].name) === -1) {
            array.push(arr[i])
        }
    }
    return array;
}

const parseData = (result, key) => {
    const retVal = []
    if (result.length > 0) {
        let time = result[0].updateTime.substr(0, 10)
        for (let i = 0; i < result.length; i++) {
            let row = []
            let newTime
            while (i < result.length) {
                newTime = result[i].updateTime.substr(0, 10)
                if (newTime !== time) {
                    break
                }
                row.push({
                    name: result[i][`${key}Name`],
                    value: result[i][`${key}_confirmedCount`]
                })
                i++
            }
            row = unique(row)
            retVal.push({
                time,
                data: row
            })
            time = newTime
        }
    }
    return retVal
}

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

module.exports = router
