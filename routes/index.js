const userRouter = require('./userRoute.js');
const authMiddleware = require('../middlewares/loginMiddleware');

function route(app) {
    app.use('/user', userRouter);
    //authMiddleware.requireAuth,
    app.use('/home', authMiddleware.requireAuth, (req, res) => {
        res.render("home");
    })

}
module.exports = route;