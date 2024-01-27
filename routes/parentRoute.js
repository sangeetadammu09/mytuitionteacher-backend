const express = require ('express');
const parentController = require ('../controllers/parentController');
const fileUpload = require('../Utils/fileUpload');
const router = express.Router();
const validateToken = require('../middlewares/validateTokenHandler');

router.post('/form',fileUpload("./Storage/images"),parentController.parentcreate);

router.post('/listoftuitions',parentController.listoftuitions);

router.post('/listoftuitionsbyid/:id',validateToken, parentController.tuitionlistbyid);

router.post('/search',validateToken, parentController.search);

router.get('/:id',validateToken, parentController.singleparent);

router.put('/update/:id', fileUpload("./Storage/images"),parentController.updateparent);

router.get('/check/:id', parentController.checkPhoneandEmailValidation)

router.delete('/delete/:id',validateToken, parentController.deleteparent);

module.exports= router; 
