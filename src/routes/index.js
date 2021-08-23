const express = require('express');

const userRouter = require('./users');

const router = express.Router();

router.get('/', (req, res) => res.send("hi"));
router.use('/users', userRouter);

module.exports = router;