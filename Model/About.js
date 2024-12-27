const mongoose = require('mongoose')
const {Schema} = mongoose;

const aboutSchema = new Schema({
    subHead:String,
    head:String,
    paragraph:String,
    projectNum:String,
    experience:String,
    buttonText:String,
    showButton:Boolean,
    aboutImg:String
})
module.exports = mongoose.model('About',aboutSchema)