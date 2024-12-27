const mongoose = require('mongoose')
const {Schema} = mongoose

const portfolioSchema = new Schema({
    portImg:String
})

module.exports = mongoose.model("Portfolio",portfolioSchema)