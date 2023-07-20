const express = require ('express');
const teacherLoginController = require ('../controllers/teacherLoginController');
const teacherrRegisterController = require ('../controllers/teacherRegisterController');
//const Auth = require ('../middleware/Auth')
const router = express.Router();

//teacher login
router.post('/register',teacherLoginController.teacherregister);

router.post('/login',teacherLoginController.teacherlogin);

router.post('/form',teacherrRegisterController.teacherRegister);

router.post('/applyjob',teacherrRegisterController.appliedteacher);

router.post('/search',teacherrRegisterController.searchTeacher);

//router.get('/listofteachers', teacherrRegisterController.listofteachers);

router.post('/listofteachersbypage', teacherrRegisterController.listofteachersbypage);

router.get('/:id', teacherrRegisterController.singleteacher)

router.put('/update/:id', teacherrRegisterController.updateteacher);

router.delete('/delete/:id', teacherrRegisterController.deleteteacher);

module.exports= router;