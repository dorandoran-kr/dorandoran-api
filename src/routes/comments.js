const express = require('express');

const commentController = require('../controllers/commentController');
const { isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/:postId', isLoggedIn, commentController.cretate);

module.exports = router;