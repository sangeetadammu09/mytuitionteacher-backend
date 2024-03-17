const express = require ('express');
const router = express.Router();
const fileUpload = require('../Utils/fileUpload');
const commomController = require ('../controllers/commonController');
const validateToken = require('../middlewares/validateTokenHandler');

router.post('/register',fileUpload("./Storage/images"),commomController.register);
router.get('/user/:id',validateToken, commomController.singleuser);
router.put('/user/update/:id', fileUpload("./Storage/images"),commomController.updateuser);
router.post('/login',commomController.login);
router.post('/user/search',validateToken, commomController.search);

module.exports= router;