const router = require('koa-router')()
const { parseDaily } = require('../utils/parseDaily')

const { provinceData } = require('../models/data')

router.prefix('/api')

function getNew(data) {
    if (data.length < 2) {
        return []
    }
    const retVal = []
    for (let i = 1; i < data.length; i++) {
        const last = JSON.parse(JSON.stringify(data[i - 1]))
        const cur = JSON.parse(JSON.stringify(data[i]))
        cur.confirmedCount = Math.max(cur.confirmedCount - last.confirmedCount, 0)
        cur.suspectedCount = Math.max(cur.suspectedCount - last.suspectedCount, 0)
        cur.curedCount = Math.max(cur.curedCount - last.curedCount, 0)
        cur.deadCount = Math.max(cur.deadCount - last.deadCount, 0)
        retVal.push(cur)
    }
    return retVal
}

router.get('/china/newAdd', async (ctx, next) => {
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
            ctx.body = { code: 200, data: getNew(retVal) }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

router.get('/province/newAdd', async (ctx, next) => {
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
            ctx.body = { code: 200, data: getNew(retVal) }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `用户查询异常：${err}` }
        })
})

module.exports = router