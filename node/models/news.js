const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    pubDate: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    infoSource: {
        type: String,
        required: true
    },
    sourceUrl: {
        type: String,
        required: true
    }
})

const newsModel = mongoose.model('news', newsSchema, 'DXYNews')

module.exports = newsModel