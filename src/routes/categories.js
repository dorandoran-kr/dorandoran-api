const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', categoryController.create);
router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getRelatedPosts);

module.exports = router;