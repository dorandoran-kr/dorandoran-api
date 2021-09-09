const express = require('express');

const postController = require('../controllers/postController');
const { isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.get('/:id', isLoggedIn, postController.getPost);
router.post('/', isLoggedIn, postController.create);

module.exports = router;