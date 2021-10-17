const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = new Schema({
    name: { type: String },
    phone: { type: String },
    gmail: { type: String },
    possion: { type: Number },
    userName: { type: String },
    passWord: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('users', UserModel); //user is name collection