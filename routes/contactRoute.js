const express = require ('express');
const contactController = require ('../controllers/contactControllers');
const router = express.Router();


router.post('/form',contactController.createContact);



module.exports= router;