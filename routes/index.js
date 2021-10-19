const userRouter = require('./userRoute.js');
const authMiddleware = require('../middlewares/loginMiddleware');

function route(app) {
    app.use('/user', userRouter);
    //authMiddleware.requireAuth,
    app.use('/home', authMiddleware.requireAuth, (req, res) => {
        res.render("home");
    })
    app.use('/question', authMiddleware.requireAuthUser, (req, res) => {
        res.render("questions");
    })
    app.use('/logout', (req, res) => {
        res.clearCookie('userID');
        res.redirect("/home");
    })

}
module.exports = route;