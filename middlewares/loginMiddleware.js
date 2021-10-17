let users = require('../src/models/userModel');
module.exports.requireAuth = function(req, res, next) {
    if (!req.cookies.userID) {
        res.redirect('login');
        return;
    }
    users.find({ '_id': req.cookies.userID })
        .then((users) => {
            res.redirect('home');
        })
        .catch(() => {
            res.redirect('login');
            return;
        });
}