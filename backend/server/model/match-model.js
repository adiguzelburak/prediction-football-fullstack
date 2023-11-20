const mongoose = require('mongoose');

var matchSchema = new mongoose.Schema({
    homeTeam: {
        id: Number,
        name: String,
        shortName: String,
        tla: String,
        crest: String
    },
    awayTeam: {
        id: Number,
        name: String,
        shortName: String,
        tla: String,
        crest: String
    },
    status: String,
    matchDay: String,
    score: {
        winner: String,
        duration: String,
        fullTime: {
            home: Number,
            away: Number
        },
        halfTime: {
            home: Number,
            away: Number
        }

    },
    utcDate: String
})

const matchDb = mongoose.model('matchdb', matchSchema);

module.exports = matchDb;