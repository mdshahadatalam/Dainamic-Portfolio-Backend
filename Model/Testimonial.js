const mongoose = require ('mongoose')
const {Schema} =  mongoose;

const testimonialSchema = new Schema({
    subHead:String,
    Headers:String,
    paragraph:String,
    showImg:Boolean,
    tesImg:String
})
module.exports = mongoose.model('Testimonial',testimonialSchema);