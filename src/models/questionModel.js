const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionModel = new Schema({
    title: { type: String },
    A: { type: String },
    B: { type: String },
    C: { type: String },
    D: { type: String },
    answer: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('questions', QuestionModel); //user is name collection