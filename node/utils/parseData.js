const { uniqueByName } = require('../utils/unique')


const fillMissing = (values) => {
    if (!values || values.length === 0)
        return []
    values.sort(it => it.time)
    let res = []
    res.push(values[0])
    for (let i = 1; i < values.length; i++) {
        let prev = JSON.parse(JSON.stringify(res.at(res.length - 1)))
        let current = values[i]
        current.data.map(it => {
            let index = prev.data.findIndex(jt => jt.name === it.name)
            if (index !== -1) {
                prev.data[index] = it
            } else {
                prev.data.push(it)
            }
        })
        prev.time = current.time
        res.push(prev)
    }
    return res
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
            row = uniqueByName(row)
            retVal.push({
                time,
                data: row
            })
            time = newTime
        }
    }
    return fillMissing(retVal)
}

module.exports = {
    parseData,
    fillMissing
}