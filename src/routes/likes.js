const express = require('express');

const likeController = require('../controllers/likeController');
const { isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.put('/:postId', isLoggedIn, likeController.like);
router.delete('/:postId', isLoggedIn, likeController.unlike);

module.exports = router;