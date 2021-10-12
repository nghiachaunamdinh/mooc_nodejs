const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController')

//userController.login();

router.post('/', userController.dannhap)
router.use('/', userController.index);
module.exports = router;