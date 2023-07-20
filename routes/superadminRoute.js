const express = require ('express');
const adminController = require ('../controllers/superadminController');
//const Auth = require ('../middleware/Auth')
const router = express.Router();

router.post('/register',adminController.adminregister);

router.post('/login',adminController.adminlogin);


module.exports= router;