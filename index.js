const express = require('express')
const path = require("path");
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const app = express()
const port = 3000
app.use(morgan("combined")) //HTTP logger
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'views')));
//app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
        //res.send('home')
        res.render('home');
    })
    //ip 127.0.0.1-localhost
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})