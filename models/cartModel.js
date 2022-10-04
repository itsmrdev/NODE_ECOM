const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cartUserID:{
        type:mongoose.Schema.ObjectId,
        required:true,
        unique:true
    },
    cartProductID:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    cartQuantity:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('cartProducts',cartSchema);