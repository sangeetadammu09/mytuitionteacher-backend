const express = require ('express');
const router = express.Router();
const commomController = require ('../controllers/commonController');

router.post('/register',commomController.register);
router.post('/login',commomController.login);

module.exports= router;