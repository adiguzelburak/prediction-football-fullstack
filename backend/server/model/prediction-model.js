const mongoose = require('mongoose');

var predictionSchema = new mongoose.Schema({
    homeTeamScore: Number,
    guestTeamScore: Number,
    userId: { type: mongoose.Schema.ObjectId },
    matchId: { type: mongoose.Schema.ObjectId }
})

const predictionDb = mongoose.model('predictiondb', predictionSchema);

module.exports = predictionDb;