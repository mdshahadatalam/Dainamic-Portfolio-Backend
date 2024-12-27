const mongoose = require('mongoose')
const {Schema} = mongoose

const resumeSchema = new Schema({
    subHead:String,
    head:String,
    paragraph:String
})
module.exports = mongoose.model('Resume',resumeSchema)