class UserController {
    index(req, res) {
        res.render("login");
    }
    dannhap(req, res) {
        console.log(req.body.username);
        res.render('loginsucces');
    }
}
module.exports = new UserController;