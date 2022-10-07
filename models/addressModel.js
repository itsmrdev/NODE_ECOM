const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        required:true,
        unique:true
    },
    Pincode:{
        type:Number,
        required:true
    },
    Strit:{
        type:String,
        required:true
    },
    Block:{
        type:String,
        required:true
    },
    Dist:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    Status:{
        type:Number,
        required:true,
        default:1
    }
})

module.exports = mongoose.model('addressModel',addressSchema);