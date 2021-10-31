const authMiddleware = require('../middlewares/loginMiddleware');
const homeController = require('../src/controllers/homeController')
const express = require('express');
const router = express.Router();
router.post('/signup', homeController.signup_post)
router.get('/signup', homeController.signup);
router.delete('/deleteQuestion/:id', authMiddleware.checkUser, homeController.deletequestion);
router.delete('/deleteUser/:id', authMiddleware.checkUser, homeController.deleteuser);
router.put('/saveeditQuestion/:id', homeController.saveeditquestion);
router.put('/saveeditUser/:id', authMiddleware.checkUser, homeController.saveedituser);
router.get('/edituser/:id', authMiddleware.checkUser, homeController.edituser);
router.get('/edit/:id', authMiddleware.checkUser, homeController.editquestion);
router.get('/listquestion', authMiddleware.checkUser, homeController.listquestion);
router.get('/listuser', authMiddleware.checkUser, homeController.listuser);
router.post('/', homeController.submitquestion)
router.get('/', homeController.showcreate);
module.exports = router;