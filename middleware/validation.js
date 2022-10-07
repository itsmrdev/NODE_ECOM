const { Validator } = require('node-input-validator');

const validateLogin= async (req,res,next) => {
  const v = new Validator(req.body, {
    userName: 'required|string',
    password: 'required|string'
  });

  v.check().then((matched) => {
    if (!matched) {
       return res.status(422).send(v.errors);
      
    }else{
        return next();
    }
  });
  
};

const validateSignup= async (req,res,next) => {
  const v = new Validator(req.body, {
    name: 'required|string',
    userName: 'required|string',
    email: 'required|string',
    password: 'required|string'
  });

  v.check().then((matched) => {
    if (!matched) {
       return res.status(422).send(v.errors);
      
    }else{
        return next();
    }
  });
  
};

const valiAddProduct= async (req,res,next) => {
  console.log(req.body.productName,'vreq');
  const v = new Validator(req.body, {
    productName: 'required|string',
    productDescription: 'required|string',
    productPrice: 'required|number',
    stockQuantity: 'required|number',
    productCategory:'required|string'
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
    validateLogin,
    validateSignup,
    valiAddProduct
};