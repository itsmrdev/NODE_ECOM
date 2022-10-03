const jwt = require('jsonwebtoken');
const sessionStorage = require('node-sessionstorage');
const bcrypt = require('bcrypt');

//verify JWT auth token
const verifyToken= async (req,res,next) => {
    
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined"){

        const bearerToken = bearerHeader.split(' ')[1];
        // if(!sessionStorage.getItem('userToken')||bearerToken!=sessionStorage.getItem('userToken')){
        //     res.status(400).send(
        //         {message:'Your session expired please login again!'}
        //     )
        //     return false;
        // }
        await jwt.verify(bearerToken,'secretkey',(err,authData) => {
            if(err){
                res.status(400).send(
                    {message:err.message}
                )
                return false;
            }
            next();
        });
        
    }else{
        res.status(404).send({message:"Auth token is required!"})//forbidden 1
    }
}

const cryptPassword = async (password, callback) => {
    const salt = await bcrypt.genSalt(10);
    let data = await bcrypt.hash(password, salt);
    return data;
}

const checkPassword = async (password, userPass, callback) => {
    return await bcrypt.compare(password, userPass);
}

const logoutUser = async()=>{
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('user');
}
const setSessionToken = async(UserData,callback)=>{
    try{

        let token = await jwt.sign({user:UserData},"secretkey");
        sessionStorage.setItem('user', UserData);
        sessionStorage.setItem('userToken', token);

        // console.log('i m waiting for token',token);
        await new Promise(resolve => setTimeout(resolve, 4000));
        // console.log('i m waited for promise',token);
        return callback('',token);


        // return callback('',token);
    }catch(error){
        console.log(error,'me');
        return callback(error);
    }
}
module.exports = {
    verifyToken,
    cryptPassword,
    checkPassword,
    logoutUser,
    setSessionToken
};
