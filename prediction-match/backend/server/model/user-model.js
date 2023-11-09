const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    favouriteTeam: String,
    totalPoint: Number,
})

const userDb = mongoose.model('userdb', userSchema);

module.exports = userDb;