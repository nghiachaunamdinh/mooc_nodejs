const authMiddleware = require('../middlewares/loginMiddleware');
const homeController = require('../src/controllers/homeController')
const express = require('express');
const router = express.Router();
router.post('/signup', homeController.signup_post)
router.get('/signup', homeController.signup);
router.delete('/deleteQuestion/:id', homeController.deletequestion);
router.delete('/deleteUser/:id', homeController.deleteuser);
router.put('/saveeditQuestion/:id', homeController.saveeditquestion);
router.put('/saveeditUser/:id', homeController.saveedituser);
router.get('/edituser/:id', homeController.edituser);
router.get('/edit/:id', homeController.editquestion);
router.get('/listquestion', homeController.listquestion);
router.get('/listuser', homeController.listuser);
router.post('/', homeController.submitquestion)
router.get('/', homeController.showcreate);
module.exports = router;