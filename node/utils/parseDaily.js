const { uniqueByKey } = require('./unique')

function parseDaily (data) {
    return uniqueByKey(data.map(it => {
        return {
            updateTime: it.updateTime.substr(0, 10),
            confirmedCount: it.province_confirmedCount,
            suspectedCount: it.province_suspectedCount,
            curedCount: it.province_curedCount,
            deadCount: it.province_deadCount,
        }
    }), () => 'updateTime')
}

module.exports = {
    parseDaily
}