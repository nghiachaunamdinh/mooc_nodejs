const userRouter = require('./userRoute.js');
const homeRouter = require('./homeRoute.js');
const questionRouter = require('./questionRoute.js');
const authMiddleware = require('../middlewares/loginMiddleware');


function route(app) {
    app.use('/user', userRouter);
    //authMiddleware.requireAuth,
    app.use('/home', authMiddleware.requireAuth, homeRouter);
    app.use('/question', authMiddleware.requireAuthUser, questionRouter);
    app.use('/logout', (req, res) => {
        res.clearCookie('userID');
        res.redirect("/home");
    });
    app.use('/test', (req, res) => {
        res.render("test");
    })

}
module.exports = route;