const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.webp') //Appending .jpg
    }
})
  
var upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' })

const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product.ctrl');

// const verifyToken = require('../middleware/auth')

router.get('/list',productCtrl.allProduct);

router.post('/add',upload.single('productImage'),productCtrl.addProduct);

router.get('/:productID',productCtrl.getProductById);


module.exports = router