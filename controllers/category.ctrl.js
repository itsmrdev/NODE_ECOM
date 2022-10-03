const fs = require('fs');
const categoryModel = require('../models/categoryModel')

    /* get category by id */
    const getCategoryById = async(req,res,next)=>{

        try{
            var category = await categoryModel.findOne({ _id: req.params.categoryID });
        }catch(error){
            
            res.status(400);
            res.send({message:error.message})
            return false;
        }
        try{
            if(category){
                res.send({message:"category found",data:category});
                return false;
            }
            res.status(404).send({message:"category not found",data:''});
            return false;
        }catch(error){
            
            res.status(403);
            res.send({message:error})
            return false;
        }
    }
    /* fetch all category */
    const allCategory = async(req,res,next)=>{
        try{
            const categorys = await categoryModel.find();
            res.send({categorys:categorys})
        }catch(error){
            res.status(403).send({error:error});
            return false;
        }
    }
    /* add category in collection */
    const addCategory = async(req,res,next)=>{

        const body = req.body;
        // console.log(req.file.filename);

        try{
            const category = new categoryModel({
                categoryName: body.categoryName,
                categoryDescription: body.categoryDescription,
                stockQuantity: body.stockQuantity,
                categoryImage: req.file.filename,
                categoryStatus: body.categoryStatus
            });

            const categorySaved = await category.save();
            res.send({message:"Category successfully added!",data:categorySaved})
        }catch(error){
            fs.rmSync(req.file.path, {
                force: true,
            });
            res.status(403).send({message:error.message})
            return false;
        }
    }

module.exports = {
    getCategoryById,
    allCategory,
    addCategory
};