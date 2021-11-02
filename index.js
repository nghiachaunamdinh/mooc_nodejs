const express = require('express')
const path = require("path");
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require("express-session")
const sessionstorage = require('sessionstorage');
const methodOverride = require('method-override')
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
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: function(x, y) {
            return x + y;
        },
        setanswer: function(str, ans) {

            ans += '';
            let css = "";

            if (ans.includes("A")) {
                css += '#A{color: green;}';
            }

            if (ans.includes("B")) {
                css += '#B{color: green;}';
            }
            if (ans.includes("C")) {
                css += '#C{color: green;}';
            }
            if (ans.includes("D")) {
                css += '#D{color: green;}';
            }
            if (str.includes("A")) {
                css += '#A{color: red;}';
            }

            if (str.includes("B")) {
                css += '#B{color: red;}';
            }
            if (str.includes("C")) {
                css += '#C{color: red;}';
            }
            if (str.includes("D")) {
                css += '#D{color: red;}';
            }
            return css;
        }
    }
}));
app.use(methodOverride('_method'));
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