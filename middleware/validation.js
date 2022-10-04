const { Validator } = require('node-input-validator');

const validateLogin= async (req,res,next) => {
  const v = new Validator(req.body, {
    userName: 'required',
    password: 'required'
  });

  v.check().then((matched) => {
    if (!matched) {
       return res.status(422).send(v.errors);
      
    }else{
        return next();
    }
  });
  
};

module.exports = {
    validateLogin
};