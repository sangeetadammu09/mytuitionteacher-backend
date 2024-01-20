const express = require ('express');
const router = express.Router();

const feedbackController = require ('../controllers/feedbackController');
const validateToken = require('../middlewares/validateTokenHandler');

router.post('/add',validateToken,feedbackController.feedbackcreate);

router.put('/update/:id',validateToken, feedbackController.updatefeedback);

router.post('/listoffeedbacks',validateToken,feedbackController.listoffeedbacks);

router.post('/listoffeedbacksbyparentid/:id',validateToken, feedbackController.feedbacklistbyparentid);

router.put('/delete/:id',validateToken, feedbackController.deletefeedback);

module.exports= router; 