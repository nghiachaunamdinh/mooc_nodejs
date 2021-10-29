const authMiddleware = require('../middlewares/loginMiddleware');
const homeController = require('../src/controllers/homeController')
const express = require('express');
const router = express.Router();
router.delete('/deleteQuestion/:id', homeController.deletequestion);
router.put('/saveeditQuestion/:id', homeController.saveeditquestion);
router.get('/edit/:id', homeController.editquestion);
router.get('/listquestion', homeController.listquestion);
router.get('/listuser', homeController.listuser);
router.post('/', homeController.submitquestion)
router.get('/', homeController.showcreate);
module.exports = router;