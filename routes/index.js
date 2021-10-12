const userRouter = require('./userRoute.js')

function route(app) {
    app.use('/login', userRouter);
    // app.get('/', (req, res) => {
    //     //res.send('home')
    //     res.render('home');
    // })
    // app.get('/login', (req, res) => {
    //     //res.send('home')
    //     res.render('login');
    // })
}
module.exports = route;