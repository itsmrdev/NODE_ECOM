const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/auth')
const {validateLogin} = require('../middleware/validation')

const userCtrl = require('../controllers/user.ctrl');


router.get('/list',verifyToken,userCtrl.userList);

router.post('/login',validateLogin,userCtrl.login);

router.post('/signup',userCtrl.signup);

router.get('/logout',verifyToken,userCtrl.logout);

module.exports = router