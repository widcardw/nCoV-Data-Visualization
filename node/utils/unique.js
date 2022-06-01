function uniqueByName (arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return null
    }
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        if (array.findIndex(it => it.name === arr[i].name) === -1) {
            array.push(arr[i])
        }
    }
    return array;
}

function uniqueByArrayFirst (arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return null
    }
    let array = []
    for (let i = 0; i < arr.length; i++) {
        if (array.findIndex(it => it[0] === arr[i][0]) === -1) {
            array.push(arr[i])
        }
    }
    return array
}

module.exports = {
    uniqueByName, uniqueByArrayFirst
}