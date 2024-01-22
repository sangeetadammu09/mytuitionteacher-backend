const express = require ('express');
const parentController = require ('../controllers/parentController');
const fileUpload = require('../Utils/fileUpload');
const router = express.Router();
const validateToken = require('../middlewares/validateTokenHandler');

router.post('/form',fileUpload("./Storage/images"),parentController.parentcreate);

router.post('/listoftuitions',validateToken,parentController.listoftuitions);

router.post('/listoftuitionsbyparentid/:id',validateToken, parentController.tuitionlistbyparentid);

router.get('/:id',validateToken, parentController.singleparent);

router.put('/update/:id', fileUpload("./Storage/images"),parentController.updateparent);

router.get('/check/:id', parentController.checkPhoneandEmailValidation)

router.delete('/delete/:id',validateToken, parentController.deleteparent);

module.exports= router; 
