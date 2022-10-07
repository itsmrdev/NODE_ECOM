const {checkPassword,setSessionToken,cryptPassword,logoutUser} = require('../middleware/auth')

const userModel = require('../models/userModel')


    const userList = async(req,res,next)=>{
        try{
            const users = await userModel.find();
            return res.send({users:users})
        }catch(error){
            return res.send({error:error})
        }
    }

    const login = async(req,res,next)=>{

        const body = req.body;

        var user = await userModel.findOne({ userName: body.userName });

        if(user===null) return res.status(404).send({ error:"User not found",message: "User not found" })

        const validPassword = await checkPassword(body.password, user.password);
        
        if (validPassword) {
            const Newuser = {
                id:user._id,
                userName:user.userName,
                email:user.email,
                userType:user.userType
            }
            let token = await setSessionToken(Newuser,async (err,token) =>{
                if(err){
                   return res.status(400).send({ error:err,message: "Something went wrong!" });
                    
                }else{
                    return token;
                }
            });
            // console.log('token',token);
            return res.status(200).send({ message: "Login successfully!" ,token:token});
           
        } else {
            return res.status(400).send({ error: "Invalid Password" });
        }
    }

    const signup = async(req,res,next)=>{

        //password encryption
        console.log('req body signup',req.body)
        req.body.password = await cryptPassword(req.body.password);
        
        try{
            await userModel.create(
                {   name:req.body.name,
                    email:req.body.email,
                    userName:req.body.userName,
                    password:req.body.password 
                }
            );
        }catch(error){
            // let err = Object.keys(error.keyPattern)[0];
            return res.status(403).send({message:error})
        }



        try{
            const user = new userModel({
                name:req.body.name,
                email:req.body.email,
                userName:req.body.userName,
                password:req.body.password
            });

            const userSaved = await user.save();
            return res.send({message:"user successfully added!",data:userSaved})
        }catch(error){
            return res.status(400).send(error)
        }
    }

    const logout = async(req,res,next)=>{
        logoutUser();
        return res.status(200).send({ message: "Logout successfully!"});
    }

module.exports = {
    userList,
    login,
    signup,
    logout,
  };