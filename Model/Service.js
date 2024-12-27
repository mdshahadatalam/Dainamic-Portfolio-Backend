const mongoose = require('mongoose')
const {Schema} = mongoose

const serviceSchema = new Schema({
    subHead:String,
    head:String,
    showImg:Boolean,
    serImg:String
})

module.exports = mongoose.model('Service', serviceSchema)