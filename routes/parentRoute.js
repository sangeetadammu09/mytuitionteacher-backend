const express = require ('express');
const parentController = require ('../controllers/parentController');
const fileUpload = require('../Utils/fileUpload');
const router = express.Router();
const validateToken = require('../middlewares/validateTokenHandler');

router.post('/register',parentController.parentregister);

router.post('/login',parentController.parentlogin);

router.post('/form',fileUpload("./Storage/images"),parentController.parentcreate);

//router.get('/listofparents', parentController.listofparents);

router.post('/listofparents',validateToken,parentController.listofparentsbypage);

router.get('/:id',validateToken, parentController.singleparent)

router.put('/update/:id', validateToken,parentController.updateparent);

router.delete('/delete/:id',validateToken, parentController.deleteparent);

module.exports= router;