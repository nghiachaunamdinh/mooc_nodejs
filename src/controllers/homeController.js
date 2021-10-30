let users = require('../models/userModel');
let questions = require('../models/questionModel');
let { mutipleMongooseToObject } = require('../../until/mongoose');
let jwt = require('jsonwebtoken');
class HomeController {
    //GET login
    showcreate(req, res) {
        res.render("home");
    };
    //GET honme/listuser
    listuser(req, res) {
        users.find({})
            .then((user) => res.render("listUser", {
                users: mutipleMongooseToObject(user)
            }))
            .catch((err) => res.json(err))
    };
    //GET singup
    submitquestion(req, res) {
        const title = req.body.title;
        const A = req.body.A;
        const B = req.body.B;
        const C = req.body.C;
        const D = req.body.D;
        let answer = req.body.answer;
        if (answer.length > 1) answer = answer.join('');
        console.log('title: ', title);
        console.log('A: ', A);
        console.log('B: ', B);
        console.log('C: ', C);
        console.log('D: ', D);
        console.log('Answer : ', answer);
        questions.create({
                "title": title,
                "C": C,
                "B": B,
                "A": A,
                "D": D,
                "answer": answer
            })
            .then(() => { res.redirect("/home/listquestion") })
            .catch((err) => { return res.json("Add user fail." + err) })
    };
    listquestion(req, res) {
        questions.find({})
            .then((question) => res.render("listQuestion", {
                questions: mutipleMongooseToObject(question)
            }))
            .catch((err) => res.json(err))
    };
    //PUT home/saveeditQuestion/:id
    saveeditquestion(req, res) {
        questions.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/home/listquestion');
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            })

    };
    //PUT home/saveeditUser/:id
    async saveedituser(req, res) {
        users.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/home/listuser');
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            })

    };
    //GET home/edit/:id
    editquestion(req, res) {
        console.log(req.params.id)
        questions.findById(req.params.id)
            .then((question) => {
                console.log('question : ', question);
                res.render("editQuestion", {
                    _id: question._id,
                    title: question.title,
                    A: question.A,
                    B: question.B,
                    C: question.C,
                    D: question.D,
                    answer: question.answer,
                })
            })
            .catch(err => {
                console.log('ERR : ', err);
                res.json(err);
            })

    };
    //GET home/edituser/:id
    edituser(req, res) {
        console.log(req.params.id)
        users.findById(req.params.id)
            .then((user) => {
                console.log('user : ', user);
                res.render("editUser", {
                    _id: user._id,
                    name: user.name,
                    phone: user.phone,
                    gmail: user.gmail,
                    possion: user.possion
                })
            })
            .catch(err => {
                console.log('ERR : ', err);
                res.json(err);
            })

    };
    //DELETE /home/deleteQuestion/:id
    deletequestion(req, res) {
        questions.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch((err) => {
                console.log(err)
                res.json(err);
            })
    };
    //DELETE /home/deleteQuestion/:id
    deleteuser(req, res) {
        users.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch((err) => {
                console.log(err)
                res.json(err);
            })
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
            .then(() => { res.redirect("/home/listuser") })
            .catch(() => { return res.render('signup', { error: "Add user fail." }); })
    };
}
module.exports = new HomeController;