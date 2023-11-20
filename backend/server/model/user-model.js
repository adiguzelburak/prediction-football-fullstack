const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: Number,
    favouriteTeam: String,
    totalPoint: Number,
})

userSchema.plugin(passportLocalMongoose);

const userDb = mongoose.model('userdb', userSchema);
module.exports = userDb;