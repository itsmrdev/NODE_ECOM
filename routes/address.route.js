const express = require('express');
const router = express.Router();


const addressCtrl = require('../controllers/address.ctrl');


router.get('/list',addressCtrl.getAddress);

router.post('/add',addressCtrl.addAddress);

router.post('/update',addressCtrl.updateAddress);

// router.get('/:categoryID',addressCtrl.getAddress);
router.get('/delete',addressCtrl.deleteAddress);


module.exports = router