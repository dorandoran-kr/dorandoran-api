const express = require('express');

const userController = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/', userController.join);
router.get('/exist', userController.isPhoneNumberExist);
router.post('/login', userController.login);

module.exports = router;