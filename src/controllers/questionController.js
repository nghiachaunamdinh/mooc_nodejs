let questions = require('../models/questionModel');
let answers = require('../models/answerModel');
let jwt = require('jsonwebtoken');
let { mutipleMongooseToObject } = require('../../until/mongoose');
class QuestionController {
    show(req, res) {
        questions.find()
            .then((question) => {
                //users = users.map(user => user.toObject());
                if (question) {
                    let page = parseInt(req.query.page) || 1;
                    question = question.slice(page - 1, page);
                    res.cookie('page', 1);
                    return res.render('questions', {
                        questions: mutipleMongooseToObject(question),
                        page: page
                    });
                } else {
                    return res.render('questions', { err: 'Không có bài thi nào.' });
                }

            })
            .catch((err) => {
                return res.render('questions', { err: err });
            });
    };
    submitAnswer(req, res) {
        let keyR = Object.keys(req.body);
        let _id = jwt.verify(req.cookies.userID, "12345")
        answers.create({
                "idUser": _id,
                "idQuestion": (keyR).join(''),
                "select": (req.body[keyR]).join('')
            })
            .then(() => {
                questions.find()
                    .then((question) => {
                        //users = users.map(user => user.toObject());
                        if (question) {
                            let cookiepage = parseInt(req.cookies.page);
                            if (cookiepage < question.length) {
                                let page = parseInt(req.cookies.page) + 1;
                                question = question.slice(page - 1, page);
                                res.cookie('page', page);
                                return res.render('questions', {
                                    questions: mutipleMongooseToObject(question),
                                    page: page
                                });
                            } else {
                                return res.render('questions', {
                                    err: 'Hoàn thành bài thi.',
                                    page: null
                                });
                            }
                        } else {
                            return res.render('questions', { err: 'Hoàn thành bài thi.' });
                        }

                    })
                    .catch((err) => {
                        return res.render('questions', { err: err });
                    });
            })
            .catch((err) => {
                return res.json("Error connect server");
            })
    }
}
module.exports = new QuestionController;