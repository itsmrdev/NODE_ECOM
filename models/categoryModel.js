const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        unique:true
    },
    categoryDescription:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String,
        required:true
    },
    categoryStatus:{
        type:Number,
        required:true,
        default:1
    }
})

module.exports = mongoose.model('categoryModel',categorySchema);