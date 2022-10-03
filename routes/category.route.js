const express = require('express');
const router = express.Router();

const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/categories/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.webp') //Appending .webp
    }
})
  
var upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' })

const categoryCtrl = require('../controllers/category.ctrl');

// const verifyToken = require('../middleware/auth')

router.get('/list',categoryCtrl.allCategory);

router.post('/add',upload.single('categoryImage'),categoryCtrl.addCategory);

router.get('/:categoryID',categoryCtrl.getCategoryById);


module.exports = router