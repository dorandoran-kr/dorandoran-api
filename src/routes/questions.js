const express = require('express');

const questionController = require('../controllers/questionController');
const { isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.get('/:questionId', questionController.getQuestions)
router.post('/:categoryId', isLoggedIn, questionController.create);

module.exports = router;