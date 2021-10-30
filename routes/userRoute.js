const authMiddleware = require('../middlewares/loginMiddleware');
const express = require('express');
const router = express.Router();

//const auth = require('../middlewares/loginMiddleware')
const userController = require('../src/controllers/userController')
router.post('/', userController.login_post)
router.get('/', userController.login);

module.exports = router;