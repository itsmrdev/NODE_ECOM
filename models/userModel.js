const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true,
        default:1
    }
})
// const userModel = mongoose.model('User', userSchema);
module.exports = mongoose.model('userModel',userSchema);