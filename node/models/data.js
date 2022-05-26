const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    continentName: {
        type: String,
        required: false,
    },
    continentEnglishName: {
        type: String,
        required: false,
    },
    countryName: {
        type: String,
        required: true,
    },
    countryEnglishName: {
        type: String,
        required: true,
    },
    provinceName: {
        type: String,
        required: true,
    },
    provinceEnglishName: {
        type: String,
        required: true,
    },
    province_zipCode: {
        type: Number,
        required: true,
    },
    province_confirmedCount: {
        type: Number,
        required: true,
    },
    province_suspectedCount: {
        type: Number,
        required: true,
    },
    province_curedCount: {
        type: Number,
        required: true,
    },
    province_deadCount: {
        type: Number,
        required: true,
    },
    updateTime: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: false,
    },
    cityEnglishName: {
        type: String,
        required: false,
    },
    city_zipCode: {
        type: Number,
        required: false,
    },
    city_confirmedCount: {
        type: Number,
        required: false,
    },
    city_suspectedCount: {
        type: Number,
        required: false,
    },
    city_curedCount: {
        type: Number,
        required: false,
    },
    city_deadCount: {
        type: Number,
        required: false,
    },
})

const provinceData = mongoose.model('provinceData', dataSchema, 'ProvinceData')
const totalData = mongoose.model('totalData', dataSchema, 'DXYData')

module.exports = { totalData, provinceData }