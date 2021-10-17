const userRouter = require('./userRoute.js');
const authMiddleware = require('../middlewares/loginMiddleware');

function route(app) {
    app.use('/login', authMiddleware.requireAuth, userRouter);
    //authMiddleware.requireAuth,
    app.use('/home', (req, res, next) => {
        res.render("home");
    })
}
module.exports = route;