const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productCategory:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    productStatus:{
        type:Number,
        required:true,
        default:1
    }
})

module.exports = mongoose.model('productModel',productSchema);