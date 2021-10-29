const authMiddleware = require('../middlewares/loginMiddleware');
const questionController = require('../src/controllers/questionController')
const express = require('express');
const router = express.Router();

//const auth = require('../middlewares/loginMiddleware')
router.get('/show', questionController.showResult);
router.get('/total', questionController.total); //hiển thị kết quả
router.post('/', questionController.submitAnswer)
router.get('/', questionController.show);
module.exports = router;