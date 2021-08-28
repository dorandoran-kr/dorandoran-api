const express = require('express');

const userRouter = require('./users');
const categoryRouter = require('./categories');
const postRouter = require('./posts');

const router = express.Router();

router.get('/', (req, res) => res.send("hi"));
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

module.exports = router;