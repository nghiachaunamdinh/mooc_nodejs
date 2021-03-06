let questions = require('../models/questionModel');
let answers = require('../models/answerModel');
let jwt = require('jsonwebtoken');
let { mutipleMongooseToObject } = require('../../until/mongoose');
class QuestionController {
    async showResult(req, res) {
        let _id = jwt.verify(req.cookies.userID, "12345"); //
        let select = "";
        await questions.find()
            .then((question) => {
                if (question) {
                    let total = question.length;
                    let page = parseInt(req.query.page);
                    answers.findOne({ 'idUser': _id._id, 'idQuestion': question[page - 1]._id }) //
                        .then((ans) => {
                            select = ans.select;
                        })
                        .catch((err) => {
                            console.log('err answer: ', err)
                        })
                    question = question.slice(page - 1, page);
                    let urlnext = './show?page=' + (page + 1);
                    let urlback = './show?page=' + (page - 1);
                    setTimeout(() => {
                        question = mutipleMongooseToObject(question);
                        question[0].select = select;
                        if (page == 1) {
                            return res.render('showResult', {
                                questions: question,
                                page: page,
                                urlnext: urlnext,
                                select: select
                            });
                        };
                        if (page == total) {
                            return res.render('showResult', {
                                questions: question,
                                page: page,
                                urlback: urlback,
                                select: select
                            });
                        }
                        return res.render('showResult', {
                            questions: question,
                            page: page,
                            urlback: urlback,
                            urlnext: urlnext,
                            select: select
                        });
                    }, 100);

                } else {
                    return res.render('showResult', { err: 'Kh??ng c?? b??i thi n??o.' });
                }
            })
            .catch((err) => {
                console.log('Kh??ng c?? c??u h???i n??o');
                return res.render('questions', { err: err });
            });

    }
    show(req, res) {
        questions.find()
            .then((question) => {
                //users = users.map(user => user.toObject());
                if (question) {
                    let total = question.length;
                    let page = parseInt(req.query.page) || 1;
                    question = question.slice(page - 1, page);
                    res.cookie('page', 1);
                    req.session.listQuestion = {};
                    return res.render('questions', {
                        questions: mutipleMongooseToObject(question),
                        page: page,
                        total: total
                    });
                } else {
                    return res.render('questions', { err: 'Kh??ng c?? b??i thi n??o.' });
                }
            })
            .catch((err) => {
                return res.render('questions', { err: err });
            });
    };
    async total(req, res) { //l??u ????p ??n ch???n v??o database, t??nh ??i???m
        let sum = 0; //t???ng s??? c??u tr??? l???i ????ng
        let _id = jwt.verify(req.cookies.userID, "12345"); //l???y ra id c???a user
        let key = Object.keys(req.session.listQuestion); //l???y ra t???ng s??? key
        //n = str.includes("world"); // true
        let i = 0;
        for (i; i < key.length; i++) {
            if ((req.session.listQuestion[key[i]]).length > 1) {
                const create = await answers.create({
                    "idUser": _id,
                    "idQuestion": key[i],
                    "select": (req.session.listQuestion[key[i]]).join(''),
                    "result": 0
                })
                if (create) {
                    const filter = { '_id': create._id };
                    let update = { 'result': 0 };
                    questions.findOne({ _id: key[i] }, await
                        function(err, files) {
                            if (err) {
                                console.log(err)
                            } else {
                                //console.log('id :', files._id.toHexString());
                                if (files.answer == ((req.session.listQuestion[files._id.toHexString()]).join(''))) {
                                    //console.log("true check------------")
                                    sum += 1;
                                    update = { 'result': 1 };
                                    // `doc` is the document _before_ `update` was applied

                                }
                            }
                        });
                    answers.findOneAndUpdate(filter, update);
                } else {
                    console.log(err);
                }
            } else {

                const create = await answers.create({
                    "idUser": _id,
                    "idQuestion": key[i],
                    "select": req.session.listQuestion[key[i]],
                    "result": 0
                });
                if (create) {
                    const filter = { '_id': create._id }; //update k???t qu???
                    let update = { 'result': 0 };
                    questions.findOne({ _id: key[i] }, await
                        function(err, files) {
                            if (err) {
                                console.log('ERR : ', err)
                            } else {
                                //console.log('id', files._id.toHexString());
                                //console.log('req.session.listQuestion : ', req.session.listQuestion[files._id.toHexString()])
                                if (files.answer == (req.session.listQuestion[files._id.toHexString()])) {
                                    //console.log("true check------------")
                                    sum += 1;
                                    update = { 'result': 1 };

                                }
                            }
                        });
                    answers.findOneAndUpdate(filter, update);
                } else {
                    console.log('ERR: ', err);
                }
            }
        }
        setTimeout(() => res.render('total', {
            total: req.cookies.totalQuestion,
            result: sum,
            score: sum * 10
        }), 300);
    }
    submitAnswer(req, res) { //chuy???n c??u h???i v?? l??u ????p ??n ???? ch???nnpm
        let keyR = Object.keys(req.body);
        let _id = jwt.verify(req.cookies.userID, "12345");
        if (keyR.length > 1) req.session.listQuestion[(keyR).join('')] = (req.body[keyR]).join('');
        else req.session.listQuestion[keyR[0]] = req.body[keyR];
        questions.find()
            .then((question) => {
                //users = users.map(user => user.toObject());
                if (question) {
                    res.cookie('totalQuestion', question.length);
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