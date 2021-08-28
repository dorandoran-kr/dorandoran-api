const express = require('express');

const userRouter = require('./users');
const categoryRouter = require('./category');

const router = express.Router();

router.get('/', (req, res) => res.send("hi"));
router.use('/users', userRouter);
router.use('/categories', categoryRouter);

module.exports = router;