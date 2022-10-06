const fs = require('fs');
const cartModel = require('../models/cartModel')
const {getLoginUser} = require('../middleware/auth');

    /* get all cart product by user id */
    const getCartProducts = async(req,res,next)=>{

        // var userDatas = sessionStorage.getItem('user');

        try{
            req.userData.id;
        }catch(error){
            return res.status(400).send({message:error.message})
        }
// console.log(req.userData.id);
// return false;
        try{
            const cartProducts = await cartModel.aggregate([{
                $lookup:
                {
                    from: "productmodels",
                    localField: "cartProductID",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {"$unwind": "$product"},
            {
                $lookup:
                {
                    from: "usermodels",
                    localField: "cartUserID",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {"$unwind": "$user"},
            {
                "$project": {
                  "_id": 1,
                  "user.userName": 1,
                  "product.productName": 1,
                  "cartQuantity":1
                }
              }
        ])//.limit(limit).skip(skip);
            console.log(cartProducts);
            try{
                if(cartProducts.length>0){
                    return res.send({message:"Product found in cart",data:cartProducts});
                    
                }
                return res.status(404).send({message:"Cart is empty",data:''});
           
            }catch(error){
                
                return res.status(403).send({message:error})
                 
            }
// console.log(product);

        }catch(error){
            
            return res.status(400).send({message:error.message})
            
        }
       
    }
    /* fetch all product */
    // const allProduct = async(req,res,next)=>{
    //     const page = req.body.page?req.body.page:0;
    //     const limit = 2;
    //     let skip = 0;
    //     if(page>=1)
    //         skip = (page-1) * limit;//first page no skip

    //     try{
    //         // const products = await productModel.find(
    //         //     {},
    //         //     { productName: 1, productCategory: 1, productImage: 1, productStatus:1})
    //         //     .limit(limit)
    //         //     .skip(skip);
            
    //         //const newAr = products.map((num)=>{return {...num._doc,cat:{}};});
            
    //         const newAr2 = await productModel.aggregate([{
    //             $lookup:
    //             {
    //                 from: "categorymodels",
    //                 localField: "productCategory",
    //                 foreignField: "_id",
    //                 as: "cates"
    //             }
    //         }]).limit(limit).skip(skip);
    //         console.log(newAr2);


    //         res.send({products:newAr2})
    //     }catch(error){
    //        return res.status(403).send({error:error});
    //     }
    // }
    /* add product in cart collection */
    const addToCart = async(req,res,next)=>{

        const body = req.body;

        try{
            var cart = new cartModel({
                cartUserID: req.userData.id,
                cartProductID: body.productID,
                cartQuantity: body.quantity
            });
        }catch(error){
            
            return res.status(403).send({message:error.message})
        }
        const exists = await cartModel.findOne({cartUserID: req.userData.id ,
            cartProductID: body.productID});
        
        if(!exists){

            if (body.quantity<=0) {
                return res.status(400).send({message:"Please enter positive quantity!"})
                console.log('here');
            }

            try{
                const productSaved = await cart.save();
                return res.send({message:"Product successfully added to cart!",data:productSaved})
            }catch(error){
                
                return res.status(403).send({message:error.message})
            }
            
        }else{
            
            if ((body.quantity + exists.cartQuantity)<1) {
                return removeFromCart(req,res);
            }

            try{
                var update = await cartModel.updateOne( {cartUserID: req.userData.id ,
                    cartProductID: body.productID},{ $inc: { cartQuantity: body.quantity }});
                return res.send({message:"Product quantity successfully updated to cart!",data:update})
            }catch(error){
                return res.status(403).send({error:error,message:"Something went wrong!"})
            }
        }
        

        
    }

    /* add product in cart collection */
    const removeFromCart = async(req,res,next)=>{

        const body = req.body;
        console.log(body);
        const where = {cartUserID: req.userData.id};
        let resMessage = "Cart empty successfully";
        if(body.productID){
        where.cartProductID=body.productID;
        resMessage = "Product successfully removed form cart";
        }
        try{
            var deleted = await cartModel.deleteOne(where);
            return res.send({message:resMessage,data:deleted})
        }catch(error){
            
            return res.status(403).send({message:error.message})
        }
    }

module.exports = {
    getCartProducts,
    removeFromCart,
    addToCart
};