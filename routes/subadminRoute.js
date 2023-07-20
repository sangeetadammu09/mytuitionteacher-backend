const express = require ('express');
const subAdminController = require ('../controllers/subAdminController');
const validateToken = require ('../middlewares/validateTokenHandler')
const router = express.Router();

router.post('/form',validateToken,subAdminController.register);

router.post('/login',subAdminController.login);

router.get('/listofsubAdmin',validateToken,subAdminController.listofsubAdmin);

//router.get('/:id', subAdminController.singleparent)

router.put('/update/:id',validateToken, subAdminController.updatesubadmin);

router.delete('/delete/:id',validateToken, subAdminController.deletesubadmin);

module.exports= router;