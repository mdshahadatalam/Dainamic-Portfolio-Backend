const mongoose = require('mongoose')
const {Schema} = mongoose;

const blogSchema = new Schema({
    data:String,
    subHead:String,
    head:String,
    showImg:Boolean,
    blogImg:String
})

module.exports = mongoose.model('Blog',blogSchema)