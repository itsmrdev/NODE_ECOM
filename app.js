const express = require('express');
const app = express();

const mongoose = require('mongoose');
const url = 'mongodb://localhost/ECOM';
const jwt = require('jsonwebtoken');
const {verifyToken} = require('./middleware/auth');


mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
const con = mongoose.connection

con.on('open',()=>{
    console.log('connected...')
})
//parse request res data in json middleware
app.use(express.json())



const userRoutes = require('./routes/user.route')
const productRoutes = require('./routes/product.route')
const categoryRoutes = require('./routes/category.route')

app.use('/users',userRoutes)

app.use('/products',verifyToken,productRoutes)
app.use('/category',verifyToken,categoryRoutes)

app.get('/',verifyToken ,(req,res)=>{
    res.send(
        {mohit:"gghk"}
    )
})
//Server started at 3000
app.listen(3000,()=>{
    console.log('Server started at 3000');
})
