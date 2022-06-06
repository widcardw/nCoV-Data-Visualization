const router = require('koa-router')()
const newsModel = require('../models/news')

router.prefix("/api")

router.get('/news', async (ctx, next) => {
    let { limit, skip } = ctx.query
    if (!limit) {
        limit = 20
    }
    if (!skip) {
        skip = 0
    }

    console.log(skip, limit)
    await newsModel
        .find({})
        .skip(skip)
        .limit(limit)
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `用户查询异常 、${err}` }
        })
})

module.exports = router
