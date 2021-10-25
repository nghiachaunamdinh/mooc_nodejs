const express = require('express')
const path = require("path");
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require("express-session")
var sessionstorage = require('sessionstorage');
const route = require('./routes');
const app = express()
const port = 3000
const db = require('./src/models/connect')
db.connect();
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
    cookie: { secure: false }
}))
app.use(morgan("combined")) //HTTP logger
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/src/views'));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.json());
app.set('views', path.join(__dirname, '/src/views'))

route(app);

//ip 127.0.0.1-localhost
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})