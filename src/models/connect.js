const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connect succesfully")
    } catch (err) {
        console.log("Connect error: " + err);
    }
}
module.exports = { connect };