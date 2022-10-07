const fs = require('fs');
const addressModel = require('../models/addressModel');

    /* get all address by user or address id */
    const getAddress = async(req,res,next)=>{

        try{
            req.userData.id;
        }catch(error){
            return res.status(400).send({message:error.message})
        }

        try{
            const userAddress = await addressModel.aggregate([{
                $lookup:
                {
                    from: "usermodels",
                    localField: "userID",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {"$unwind": "$user"}])//.limit(limit).skip(skip);
            console.log(userAddress);
            try{
                if(userAddress.length>0){
                    return res.send({message:"Address found in collection",data:userAddress});
                }
                return res.status(404).send({message:"Address collection is empty",data:''});
           
            }catch(error){
                
                return res.status(403).send({message:error})
                 
            }


        }catch(error){
            
            return res.status(400).send({message:error.message})
            
        }
       
    }

    /* add address in address collection */
    const addAddress = async(req,res,next)=>{

        const body = req.body;

        try{
            const address = new addressModel({
                userID: req.userData.id,
                Pincode: body.Pincode,
                Strit: body.Strit,
                Block: body.Block,
                Dist: body.Dist,
                State: body.State,
                Country: body.Country
            });

            try{
                const addressSaved = await address.save();
                return res.send({message:"Address successfully saved!",data:addressSaved})
            }catch(error){
                
                return res.status(403).send({message:error.message})
            }
        }catch(error){
            
            return res.status(403).send({message:error.message})
        }
        
    }

    /* update address */
    const updateAddress = async(req,res,next) => {
        const body = req.body;

        try{
            req.userData.id;
        }catch(error){
            return res.status(400).send({message:error.message})
        }
        if(!req.body.addressID){
            return res.status(400).send({message:"Address ID required!"})
        }

        const exists = await addressModel.findOne({userID: req.userData.id ,
            _id: body.addressID});

            if(!exists){
                return res.status(400).send({message:"Address not found !"})
            }


            try{

                let dataUpdate = {
                    Pincode: body.Pincode?body.Pincode:exists.Pincode,
                    Strit: body.Strit?body.Strit:exists.Strit,
                    Block: body.Block?body.Block:exists.Block,
                    Dist: body.Dist?body.Dist:exists.Dist,
                    State: body.State?body.State:exists.State,
                    Country: body.Country?body.Country:exists.Country
                };
                var update = await addressModel.updateOne( {userID: req.userData.id ,
                    _id: body.addressID},{ $set: dataUpdate});
                return res.send({message:"Address successfully updated!",data:update})
            }catch(error){
                return res.status(403).send({error:error,message:"Something went wrong!"})
            }
    }
    /* delete address in collection */
    const deleteAddress = async(req,res,next)=>{

        const body = req.body;
        console.log(body);
        const where = {userID: req.userData.id};
        let resMessage = "All address deleted successfully";
        if(body.addressID){
        where._id=body.addressID;
        resMessage = "Address deleted successfully";
        }
        try{
            var deleted = await addressModel.deleteOne(where);
            return res.send({message:resMessage,data:deleted})
        }catch(error){
            
            return res.status(403).send({message:error.message})
        }
    }

module.exports = {
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress
};