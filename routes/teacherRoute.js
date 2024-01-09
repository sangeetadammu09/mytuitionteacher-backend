const express = require ('express');
const teacherController = require ('../controllers/teacherController');
const validateToken = require('../middlewares/validateTokenHandler');
const fileUpload = require('../Utils/fileUpload');
const router = express.Router();

//teacher login
router.post('/register',teacherController.teacherregister);

router.post('/login',teacherController.teacherlogin);

router.post('/form',fileUpload("./Storage/images"),teacherController.createteacher);

router.post('/applyjob',teacherController.appliedteacher);

router.post('/search',teacherController.searchTeacher);

//router.get('/listofteachers', teacherController.listofteachers);

router.post('/listofteachers',validateToken, teacherController.listofteachersbypage);

router.get('/:id',validateToken, teacherController.singleteacher)

router.get('/check/:val', teacherController.checkPhoneandEmailValidation)

router.put('/update/:id', validateToken,teacherController.updateteacher);

router.delete('/delete/:id',validateToken, teacherController.deleteteacher);

module.exports= router;