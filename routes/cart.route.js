const express = require('express');
const router = express.Router();

const cartCtrl = require('../controllers/cart.ctrl');

router.get('/list',cartCtrl.getCartProducts);

router.post('/add',cartCtrl.addToCart);

router.post('/delete',cartCtrl.removeFromCart);

module.exports = router