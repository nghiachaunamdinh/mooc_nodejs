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
                    let total = question.length;
                    let page = parseInt(req.query.page) || 1;
                    question = question.slice(page - 1, page);
                    res.cookie('page', 1);
                    req.session.listQuestion = {}; //
                    //sessionstorage.setItem('answer', { dac: 'dac' });
                    return res.render('questions', {
                        questions: mutipleMongooseToObject(question),
                        page: page,
                        total: total
                    });
                } else {
                    return res.render('questions', { err: 'Không có bài thi nào.' });
                }
            })
            .catch((err) => {
                return res.render('questions', { err: err });
            });
    };
    async total(req, res) { //lưu đáp án chọn vào database, tính điểm
        let sum = 0; //tổng số câu trả lời đúng
        let _id = jwt.verify(req.cookies.userID, "12345"); //lấy ra id của user
        let key = Object.keys(req.session.listQuestion); //lấy ra tổng số key
        console.log('key ; ', key)
        let i = 0;
        for (i; i < key.length; i++) {
            if ((req.session.listQuestion[key[i]]).length > 1) {
                const create = await answers.create({
                    "idUser": _id,
                    "idQuestion": key[i],
                    "select": (req.session.listQuestion[key[i]]).join('')
                })
                if (create) {
                    questions.findOne({ _id: key[i] }, function(err, files) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('id :', files._id.toHexString());
                            //console.log("files: ", files);
                            console.log('req.session.listQuestion[files._id.toHexString(): ', req.session.listQuestion[files._id.toHexString()]);
                            if (files.answer == ((req.session.listQuestion[files._id.toHexString()]).join(''))) {
                                console.log("true check------------")
                                sum += 1;
                                console.log('sum two: ', sum);
                            }
                        }
                    });
                } else {
                    console.log(err);
                }
            } else {

                const create = await answers.create({
                    "idUser": _id,
                    "idQuestion": key[i],
                    "select": req.session.listQuestion[key[i]]
                });
                if (create) {
                    questions.findOne({ _id: key[i] }, function(err, que) {
                        if (err) {
                            console.log('ERR : ', err)
                        } else {
                            console.log('id', que._id.toHexString());
                            //console.log("que", que);
                            console.log('req.session.listQuestion : ', req.session.listQuestion[que._id.toHexString()])
                            if (que.answer == (req.session.listQuestion[que._id.toHexString()])) {
                                console.log("true check------------")
                                sum += 1;
                                console.log('sum one: ', sum);
                            }
                        }
                    });

                } else {
                    console.log('ERR: ', err);
                }
            }
        }
        res.json(sum);
    }
    submitAnswer(req, res) { //chuyển câu hỏi và lưu đáp án đã chọnnpm
        let keyR = Object.keys(req.body);
        let _id = jwt.verify(req.cookies.userID, "12345");
        if (keyR.length > 1) req.session.listQuestion[(keyR).join('')] = (req.body[keyR]).join('');
        else req.session.listQuestion[keyR[0]] = req.body[keyR];
        //console.log(req.session.listQuestion); //
        //let key = Object.keys(req.session.listQuestion); //
        //console.log(Object.keys(req.session.listQuestion)); //
        //if ((req.session.listQuestion[key[0]]).length > 1) console.log((req.session.listQuestion[key[0]]).join('')); //
        //else console.log(req.session.listQuestion[key[0]]); //
        questions.find()
            .then((question) => {
                //users = users.map(user => user.toObject());
                if (question) {
                    let total = question.length;
                    let cookiepage = parseInt(req.cookies.page);
                    if (cookiepage < question.length) {
                        let page = parseInt(req.cookies.page) + 1;
                        question = question.slice(page - 1, page);
                        res.cookie('page', page);

                        return res.render('questions', {
                            questions: mutipleMongooseToObject(question),
                            page: page,
                            total: total
                        });
                    } else {
                        return res.redirect('question/total');
                    }
                } else {
                    return res.render('questions', { err: 'Congratulations, you have completed the survey.' });
                }


            })
            .catch((err) => {
                return res.json("Error connect server");
            })
    }
}
module.exports = new QuestionController;