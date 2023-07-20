const express = require ('express');
const parentController = require ('../controllers/parentController');
const parentprofileController = require ('../controllers/parentprofileController');
//const Auth = require ('../middleware/Auth')
const router = express.Router();

router.post('/register',parentController.parentregister);

router.post('/login',parentController.parentlogin);

router.post('/form',parentprofileController.parentcreateprofile);

router.get('/listofparents',  parentprofileController.listofparents);

router.post('/listofteachingjobsbypage',  parentprofileController.listofteachingjobsbypage);

router.get('/:id', parentprofileController.singleparent)

router.put('/update/:id', parentprofileController.updateparent);

router.delete('/delete/:id', parentprofileController.deleteparent);

module.exports= router;