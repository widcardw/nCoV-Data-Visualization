const { uniqueByArrayFirst } = require('./unique')

function parseDaily (data) {
    return uniqueByArrayFirst(data.map(it => [it.updateTime.substr(0, 10), it.province_confirmedCount]))
}

module.exports = {
    parseDaily
}