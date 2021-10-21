const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerModel = new Schema({
    idUser: { type: String },
    idQuestion: { type: String },
    select: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('answers', answerModel); //user is name collection