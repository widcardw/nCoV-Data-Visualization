const { Db } = require("mongodb")

var map = function () {
    emit(
        { provinceName: this.provinceName, updateTime: this.updateTime.slice(0, 10) },
        {
            countryName: this.countryName,
            countryEnglishName: this.countryEnglishName,
            provinceName: this.provinceName,
            provinceEnglishName: this.provinceEnglishName,
            province_zipCode: this.province_zipCode,
            province_confirmedCount: this.province_confirmedCount,
            province_suspectedCount: this.province_suspectedCount,
            province_curedCount: this.province_curedCount,
            province_deadCount: this.province_deadCount,
            updateTim: this.updateTime
        })
}

var reduce = function (key, values) {
    return values[0]
}

db.DXYData.mapReduce(
    function () {
        emit(
            { provinceName: this.provinceName, updateTime: this.updateTime.slice(0, 10) },
            {
                countryName: this.countryName,
                countryEnglishName: this.countryEnglishName,
                provinceName: this.provinceName,
                provinceEnglishName: this.provinceEnglishName,
                province_zipCode: this.province_zipCode,
                province_confirmedCount: this.province_confirmedCount,
                province_suspectedCount: this.province_suspectedCount,
                province_curedCount: this.province_curedCount,
                province_deadCount: this.province_deadCount,
                updateTim: this.updateTime
            })
    },
    function (key, values) {
        return values[0]
    },
    {
        out: 'ProvinceData',
        sort: { updateTime: 1 }
    }
)