const fs = require('fs');
const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')

    /* get product by id */
    const getProductById = async(req,res,next)=>{

        try{
            var product = await productModel.findOne({ _id: req.params.productID });
        }catch(error){
            
            res.status(400);
            res.send({message:error.message})
            return false;
        }
        
        try{
            if(product){
                res.send({message:"Product found",data:product});
                return false;
            }
            res.status(404).send({message:"Product not found",data:''});
            return false;
        }catch(error){
            
            res.status(403);
            res.send({message:error})
            return false;
        }
    }
    /* fetch all product */
    const allProduct = async(req,res,next)=>{
        const page = req.body.page?req.body.page:0;
        const limit = 2;
        let skip = 0;
        if(page>=1)
            skip = (page-1) * limit;//first page no skip

        try{
            // const products = await productModel.find(
            //     {},
            //     { productName: 1, productCategory: 1, productImage: 1, productStatus:1})
            //     .limit(limit)
            //     .skip(skip);
            
            //const newAr = products.map((num)=>{return {...num._doc,cat:{}};});
            
            const newAr2 = await productModel.aggregate([{
                $lookup:
                {
                    from: "categorymodels",
                    localField: "productCategory",
                    foreignField: "_id",
                    as: "cates"
                }
            }]).limit(limit).skip(skip);
            console.log(newAr2);


            res.send({products:newAr2})
        }catch(error){
            res.status(403).send({error:error});
            return false;
        }
    }
    /* add product in collection */
    const addProduct = async(req,res,next)=>{

        const body = req.body;
         console.log(body);

        try{
            const product = new productModel({
                productName: body.productName,
                productDescription: body.productDescription,
                stockQuantity: body.stockQuantity,
                productImage: req.file.filename,
                productStatus: body.productStatus,
                productCategory: body.productCategory
            });

            const productSaved = await product.save();
            res.send({message:"Product successfully added!",data:productSaved})
        }catch(error){
            fs.rmSync(req.file.path, {
                force: true,
            });
            res.status(403).send({message:error.message})
            return false;
        }
    }

module.exports = {
    getProductById,
    allProduct,
    addProduct
};