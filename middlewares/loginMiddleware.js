let jwt = require('jsonwebtoken')
let answers = require('../src/models/answerModel');
let users = require('../src/models/userModel');
module.exports.requireAuth = function(req, res, next) {
    if (!req.cookies.userID) {
        res.redirect('/user');
        return;
    }
    let _id = jwt.verify(req.cookies.userID, "12345")
    users.find({ '_id': _id })
        .then((users) => {
            res.locals.user = users[0].name;
            if (users[0].possion == 1) {
                res.locals.possion = true;
                next();
            } else {
                return res.redirect('/question');
            }

        })
        .catch(() => {
            res.redirect('/user');
            return;
        });
}
module.exports.requireAuthUser = function(req, res, next) {

    if (!req.cookies.userID) {
        res.redirect('/user');
        return;
    }
    let _id = jwt.verify(req.cookies.userID, "12345")
    users.find({ '_id': _id })
        .then((users) => {
            res.locals.user = users[0].name;
            if (users[0].possion == 2) {
                next();
            } else {
                return res.redirect('/home');
            }

        })
        .catch(() => {
            res.redirect('/user');
            return;
        });
}
module.exports.checkUser = function(req, res, next) {

        if (!req.cookies.userID) {
            res.redirect('/user');
            return;
        } else {
            next();
        }
    }
    //kiểm tra xem đã th
module.exports.checksurveydone = function(req, res, next) {
    let _id = jwt.verify(req.cookies.userID, "12345")
    answers.findOne({ 'idUser': _id })
        .then((ans) => {
            console.log('ans:', ans)
            if (ans == null) next()
            else return res.render('ShowDone');

        })
        .catch((err) => {
            console.log('err checksurveydone: ', err)
            return res.json(err);
        });
}