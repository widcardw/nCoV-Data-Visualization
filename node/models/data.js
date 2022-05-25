const mongoose =require('mongoose')

const dataSchema = new mongoose.Schema({
    continentName: {
        type: String,
        required: false,
    },
    continentEnglishName: {
        type: String,
        required: false,
    },
    countryName : {
        type: String,
        required: true,
    },
    countryEnglishName : {
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
        type: String,
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
        type: Date,
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
        type: String,
        required: false,
    },
    city_confirmedCount: {
        type:Number,
        required: false,
    },
    city_suspectedCount: {
        type:Number,
        required: false,
    },
    city_curedCount: {
        type:Number,
        required: false,
    },
    city_deadCount: {
        type:Number,
        required: false,
    },
})

const totalData = mongoose.model('data', dataSchema, 'DXYData')
const provinceData = mongoose.model('province', dataSchema, 'ProvinceData')

module.exports = {
    totalData,
    provinceData
};