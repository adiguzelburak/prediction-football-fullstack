var matchDb = require('../model/match-model')
var userDb = require('../model/user-model')
var predictionDb = require('../model/prediction-model')
const mongoose = require('mongoose');


// create routers
exports.createMatch = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty !' })
        return;
    }

    const body = req.body
    var today = new Date();
    today.setHours(today.getHours() + 4);
    const match = new matchDb({
        homeTeam: body.homeTeam,
        guestTeam: body.guestTeam,
        homeTeamScore: body.homeTeamScore,
        guestTeamScore: body.guestTeamScore,
    })
    try {
        const addMatch = await match.save(match)
        await res.send(addMatch);
    } catch (error) {
        console.log(error)
        res.send(() => { message: error })
    }
}

exports.createUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty !' })
        return;
    }

    const body = req.body
    const user = new userDb({
        username: body.username,
        email: body.email,
        age: body.age,
        favouriteTeam: body.favouriteTeam,
        userPredictions: []
    })

    try {
        const userSave = await user.save(user)
        await res.send(userSave)

    } catch (error) {
        res.send(() => { message: error })
    }
}

exports.createPrediction = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty !' })
        return;
    }
    const body = req.body
    const prediction = new predictionDb({
        homeTeamScore: body.homeTeamScore,
        guestTeamScore: body.guestTeamScore,
        userId: body.userId,
        matchId: body.matchId
    })

    try {
        const predictionSave = await prediction.save(prediction)
        await res.send(predictionSave)

    } catch (error) {
        res.send(() => { message: error })
    }
}

// find routers

//getPrediction => to find user who guess the match scores

exports.getPrediction = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        try {
            const predictorUserId = await predictionDb.aggregate([
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(id)
                    },
                },
                {
                    $lookup: {
                        from: "userdbs",
                        localField: "userId",
                        foreignField: "_id",
                        as: "predictionOwner"
                    }
                },
                {
                    $lookup: {
                        from: "matchdbs",
                        localField: "matchId",
                        foreignField: "_id",
                        as: "matchScoreInfo"
                    }
                }
            ])
            await res.send(predictorUserId)
        } catch (error) {
            console.log("hello", error)
            await res.send({ message: error })
        }
    }
    else {
        try {
            const getAllDataResponse = await predictionDb.aggregate([
                {
                    $lookup: {
                        from: "userdbs",
                        localField: "userId",
                        foreignField: "_id",
                        as: "predictionOwner"
                    }
                },
                {
                    $lookup: {
                        from: "matchdbs",
                        localField: "matchId",
                        foreignField: "_id",
                        as: "matchScoreInfo"
                    }
                }
            ])
            await res.send(getAllDataResponse)
        } catch (error) {
            await res.send({ message: error })
        }
    }
}

exports.getMatch = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        try {
            const dataById = await matchDb.findById(id)
            await res.send(dataById)
        } catch (error) {
            await res.send({ message: error })
        }
    }
    else {
        try {
            const getAllDataResponse = await matchDb.find()
            await res.send(getAllDataResponse)
        } catch (error) {
            await res.send({ message: error })
        }
    }
}

exports.getUser = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        try {
            const dataById = await userDb.findById(id)
            await res.send(dataById)
        } catch (error) {
            await res.send({ message: error })
        }
    }
    else {
        try {
            const getAllDataResponse = await userDb.find()
            await res.send(getAllDataResponse)
        } catch (error) {
            await res.send({ message: error })
        }
    }
}

