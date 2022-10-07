const express = require('express');
const app = express();

const mongoose = require('mongoose');
const url = 'mongodb://localhost/ECOM';
const jwt = require('jsonwebtoken');
const {verifyToken,verifyAdmin} = require('./middleware/auth');


mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
const con = mongoose.connection

con.on('open',()=>{
    console.log('connected...')
})
//parse request res data in json middleware
app.use(express.json())

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

const userRoutes = require('./routes/user.route')
const productRoutes = require('./routes/product.route')
const categoryRoutes = require('./routes/category.route')
const cartRoutes = require('./routes/cart.route')
const addressRoutes = require('./routes/address.route')

app.use('/users',userRoutes)

app.use('/products',verifyToken,productRoutes)
app.use('/category',verifyToken,categoryRoutes)
app.use('/cart',verifyToken,cartRoutes)
app.use('/address',verifyToken,addressRoutes)

app.get('/',verifyToken ,(req,res)=>{
    res.send(
        {mohit:"gghk"}
    )
})
//Server started at 3000
app.listen(3000,()=>{
    console.log('Server started at 3000');
})
