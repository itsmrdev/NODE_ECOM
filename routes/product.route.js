const {verifyAdmin} = require('../middleware/auth');
const multer  = require('multer')
// const {valiAddProduct} = require('../middleware/validation');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('f',file);
      cb(null, 'uploads/products/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.webp') //Appending .webp
    }
})

// const uploadFile = async (req,res,next)=>{
//   console.log(req.file);

//   if(req.file==undefined||req.file.path==undefined){
//       return res.status(403).send({message:"Product Image is requireds"});
//   }
//   console.log(req);
//   upload.single('productImage');
//   next();
// }

var upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' })

const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product.ctrl');

// const verifyToken = require('../middleware/auth')

router.get('/list',productCtrl.allProduct);

router.post('/add',verifyAdmin,upload.single('productImage'),productCtrl.addProduct);

router.get('/:productID',productCtrl.getProductById);


module.exports = router