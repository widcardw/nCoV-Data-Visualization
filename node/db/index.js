const mongoose = require('mongoose')

const mongoConnect = async () => {
    await mongoose
        .connect('mongodb://localhost:27017/2019-nCoV', { useNewUrlParser: true })
        .then(() => {
            console.log("数据库连接成功！")
        })
        .catch((err) => {
            console.log("数据库连接失败！", err)
        })
}

module.exports = mongoConnect
