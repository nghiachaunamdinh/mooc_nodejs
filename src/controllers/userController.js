let users = require('../models/userModel');
let { mutipleMongooseToObject } = require('../../until/mongoose')
class UserController {
    //GET login
    login(req, res) {
        res.render("login");
    };
    //GET singup
    signup(req, res) {
        res.render("signup");
    };
    //POST singup
    signup_post(req, res) {
        const name = req.body.name;
        const phone = req.body.phone;
        const gmail = req.body.gmail;
        const possion = req.body.possion;
        const username = req.body.username;
        const password = req.body.password;
        users.create({
                "name": name,
                "phone": phone,
                "gmail": gmail,
                "possion": possion,
                "userName": username,
                "passWord": password
            })
            .then(() => { res.redirect("/user/login") })
            .catch(() => { res.send("fail") })
    };
    //POST login
    login_post(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        users.find({ 'userName': username, 'passWord': password })
            .then((users) => {
                //users = users.map(user => user.toObject());
                res.cookie('userID', users[0]._id);
                res.locals.user = users[0].name;
                res.render('home', {
                    users: mutipleMongooseToObject(users)
                });
            })
            .catch(() => {

                res.redirect("/user");
            });
    }
}
module.exports = new UserController;