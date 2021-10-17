const authMiddleware = require('../middlewares/loginMiddleware');
const express = require('express');
const router = express.Router();

//const auth = require('../middlewares/loginMiddleware')
const userController = require('../src/controllers/userController')
router.post('/', userController.login_post)
router.get('/', userController.login);
router.post('/signup', userController.signup_post)
router.get('/signup', userController.signup);
module.exports = router;