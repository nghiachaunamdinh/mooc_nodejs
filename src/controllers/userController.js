let users = require('../models/userModel');
let { mutipleMongooseToObject } = require('../../until/mongoose');
let jwt = require('jsonwebtoken');
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
    async signup_post(req, res) {
        const name = req.body.name;
        const phone = req.body.phone;
        const gmail = req.body.gmail;
        const possion = req.body.possion;
        const password = req.body.password;
        const findPhone = await users.findOne({ phone });
        const findUser = await users.findOne({ gmail });
        if (findPhone) return res.render('signup', { error: "Phone is already in use." });
        if (findUser) return res.render('signup', { error: "Gmail is already in use." });

        users.create({
                "name": name,
                "phone": phone,
                "gmail": gmail,
                "possion": possion,
                "passWord": password
            })
            .then(() => { res.redirect("/user") })
            .catch(() => { res.send("fail") })
    };
    //POST login
    login_post(req, res) {
        const gmail = req.body.gmail;
        const password = req.body.password;

        users.find({ 'gmail': gmail, 'passWord': password })
            .then((users) => {
                //users = users.map(user => user.toObject());
                if (users) {
                    let token = jwt.sign({ _id: users[0]._id }, "12345");
                    res.cookie('userID', token);
                    res.locals.user = users[0].name;
                    console.log(res.locals.user);
                    console.log(users[0].name);
                    return res.redirect('home');
                    // return res.render('home', {
                    //     users: mutipleMongooseToObject(users),
                    //     token: token
                    // });
                } else {
                    return res.render("login", {
                        message: "Error: Server error.",
                    });
                }

            })
            .catch(() => {
                return res.render("login", {
                    message: "Error: Username or password incorrect.",
                });
            });
    }
}
module.exports = new UserController;