let users = require('../src/models/userModel');
module.exports.requireAuth = function(req, res, next) {
    if (!req.cookies.userID) {
        res.redirect('/user');
        return;
    }
    users.find({ '_id': req.cookies.userID })
        .then((users) => {
            res.locals.user = users[0].name;
            next();
        })
        .catch(() => {
            res.redirect('/user');
            return;
        });
}