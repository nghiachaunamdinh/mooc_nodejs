let users = require('../models/userModel');
let { mutipleMongooseToObject } = require('../../until/mongoose')
class UserController {
    //GET login
    index(req, res) {
            res.render("login");
        }
        //POST login
        // const username = req.body.username;
        // const password = req.body.password;
        // console.log(username)
        // console.log(password)
        //users => {
        // users = users.map(user => user.toObject());
        //res.render('home', { users });
        //res.send("Login succesfully");
        //}
    login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        users.find({ 'userName': username, 'passWord': password })
            .then((users) => {
                //users = users.map(user => user.toObject());
                res.cookie('userID', users[0]._id);
                res.render('home', {
                    users: mutipleMongooseToObject(users)
                });
            })
            .catch(() => { res.redirect("/login"); });
        //res.cookie('userID', results[0]._id);
    }
}
module.exports = new UserController;