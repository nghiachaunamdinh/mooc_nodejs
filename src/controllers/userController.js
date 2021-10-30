let users = require('../models/userModel');
let { mutipleMongooseToObject } = require('../../until/mongoose');
let jwt = require('jsonwebtoken');
class UserController {
    //GET login
    login(req, res) {
        res.render("login");
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
                    return res.redirect('./home');
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