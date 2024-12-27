const mongoose = require('mongoose')
const {Schema} = mongoose;


const navbarSchema = new Schema({
    menu: String,
    buttonText:String,
    showButton:Boolean,
    ShowImg:String,
    logo:String
})

module.exports = mongoose.model('Navbar',navbarSchema)
