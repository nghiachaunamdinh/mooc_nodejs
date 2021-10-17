const authMiddleware = require('../middlewares/loginMiddleware');
const express = require('express');
const router = express.Router();

//const auth = require('../middlewares/loginMiddleware')
const userController = require('../src/controllers/userController')
router.post('/', userController.login)
router.get('/', userController.index);
module.exports = router;