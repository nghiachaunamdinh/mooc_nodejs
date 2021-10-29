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
                user: mutipleMongooseToObject(user)
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
    }
}
module.exports = new HomeController;