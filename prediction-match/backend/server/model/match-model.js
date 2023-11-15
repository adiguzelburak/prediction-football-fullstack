const mongoose = require('mongoose');

var matchSchema = new mongoose.Schema({
    homeTeam: String,
    homeTeamScore: Number,
    guestTeam: String,
    guestTeamScore: Number,
    status: String,
})

const matchDb = mongoose.model('matchdb', matchSchema);

module.exports = matchDb;