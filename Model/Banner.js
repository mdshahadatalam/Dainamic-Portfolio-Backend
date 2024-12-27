const mongoose = require('mongoose')
const {Schema} = mongoose;


const bannerSchema = new Schema({
    subHead: String,
    head:String,
    paragraph:String,
    buttonText:String,
    buttonShow:Boolean,
    image:String
})

module.exports = mongoose.model('Banner',bannerSchema)
