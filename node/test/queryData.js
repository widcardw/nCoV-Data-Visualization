const { provinceData } = require('../models/data')

const getData = async () => {
    await provinceData
        .find({ '_id.updateTime': '2022-04-19' })
        .then(result => {
            console.log(result)
        })
}

module.exports = {
    getData
}
