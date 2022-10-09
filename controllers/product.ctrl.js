const fs = require('fs');
const productModel = require('../models/productModel')


    /* get product by id */
    const getProductById = async(req,res,next)=>{

        try{
            const product = await productModel.findOne({ _id: req.params.productID });
            try{
                if(product){
                    return res.send({message:"Product found",data:product});
                }
                return res.status(404).send({message:"Product not found",data:''});
            }catch(error){
                
                return res.status(403).send({message:error})
            }
        }catch(error){
            
            return res.status(400).send({message:error.message})
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
            
            const products = await productModel.aggregate([{
                $lookup:
                {
                    from: "categorymodels",
                    localField: "productCategory",
                    foreignField: "_id",
                    as: "cates"
                }
            },{$skip:skip},{$limit:limit}])
            // console.table(newAr2);

            return res.send({products:products})
        }catch(error){
            return res.status(403).send({error:error});
        }
    }
    /* add product in collection */
    const addProduct = async(req,res,next)=>{
        // valiAddProduct(req);
        

        const body = req.body;
        //  console.log(req.file,'fl');
        //  console.log(body);
        if(req.file==undefined||req.file.path==undefined){
            return res.status(403).send({message:"Product Image is required"});
        }

        try{
            const product = new productModel({
                productName: body.productName,
                productDescription: body.productDescription,
                stockQuantity: body.stockQuantity,
                productImage: req.file.filename,
                productStatus: body.productStatus,
                productCategory: body.productCategory,
                productPrice: body.productPrice
            });

            const productSaved = await product.save();
            return res.send({message:"Product successfully added!",data:productSaved})
        }catch(error){

            if(req.file!=undefined&&req.file.path!=undefined){

                fs.rmSync(req.file.path, {
                    force: true,
                });
            }

            return res.status(403).send({message:error.message})

        }
    }

module.exports = {
    getProductById,
    allProduct,
    addProduct
};