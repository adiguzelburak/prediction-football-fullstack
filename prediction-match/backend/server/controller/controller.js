var matchDb = require('../model/match-model')
var userDb = require('../model/user-model')
var predictionDb = require('../model/prediction-model')
const mongoose = require('mongoose');
const jwt = require('jwt-simple')
const config = require('../../middleware/config')


// create routers
exports.createMatch = async (req, res) => {

    await fetch('https://api.football-data.org/v4/competitions/PL/matches?matchday=13', {
        headers: {
            "X-Auth-Token": '128d97c597b04b05aa4e46632dc3246e',
        }
    })
        .then(res => res.json())
        .then(response => {
            response.matches.map(async (singleMatch) => {
                if (!singleMatch) {
                    res.status(400).send({ message: 'Content can not be empty !' })
                    return;
                }

                const match = new matchDb({
                    homeTeam: singleMatch.homeTeam,
                    awayTeam: singleMatch.awayTeam,
                    matchDay: singleMatch.matchDay,
                    status: singleMatch.status,
                    score: singleMatch.score,
                    utcDate: singleMatch.utcDate
                })
                try {
                    await match.save(match)
                } catch (error) {
                    console.log(error)
                    res.send(() => { message: error })
                }
            })
            res.send({ message: 'Matches are fetched successfully' })
        })
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
        totalPoint: 0,
    })
    console.log(user)

    try {
        const userSave = await user.save(user)
        console.log(user, 'saved !')
        await res.send(userSave)

    } catch (error) {
        res.send(() => { message: error })
    }
}

exports.createPrediction = async (req, res) => {
    console.log(req.body)
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty !' })
        return;
    }
    else if (!req.body.token) {
        res.status(401).send({ message: 'Unauthorized, you have to login to prediction' })
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
    if (req.params.id) {
        const id = req.params.id;
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

exports.getAllPrediction = async (req, res) => {
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

exports.finishMatch = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        try {
            const updateMatchData = await matchDb.findByIdAndUpdate(id, req.body)
            const matchDataById = await matchDb.findById(updateMatchData._id)

            const getPredictions = await predictionDb.aggregate([
                {
                    $match: {
                        matchId: new mongoose.Types.ObjectId(matchDataById._id)
                    }
                },
                {
                    $lookup: {
                        from: "userdbs",
                        localField: "userId",
                        foreignField: "_id",
                        as: "predictionOwner"
                    }
                }
            ])


            getPredictions.forEach(async (prediction, index) => {
                let point = 0;

                // CONTROL SCORES POINTS
                if (matchDataById.homeTeamScore === prediction.homeTeamScore) {
                    point += 5;
                }
                if (matchDataById.guestTeamScore === prediction.guestTeamScore) {
                    point += 5;
                }

                // CONTROL MATCH RESULT POINTS
                if (matchDataById.homeTeamScore > matchDataById.guestTeamScore
                    && prediction.homeTeamScore > prediction.guestTeamScore) {
                    point += 3;
                }
                if (matchDataById.homeTeamScore < matchDataById.guestTeamScore
                    && prediction.homeTeamScore < prediction.guestTeamScore) {
                    point += 3;
                }
                if (matchDataById.homeTeamScore === matchDataById.guestTeamScore
                    && prediction.homeTeamScore === prediction.guestTeamScore) {
                    point += 3;
                }

                await userDb.findByIdAndUpdate(prediction.userId, {
                    totalPoint: prediction.predictionOwner[0].totalPoint += point
                })

            })
            await res.send({ message: 'Points are updated successfully.' })

        } catch (error) {
            await res.send({ message: error })
        }
    }
    else {
        res.send({ message: 'Match Id could not found. Try again!' })
    }
}


// delete functions

exports.deleteMatch = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        await res.status(404).send({ message: `Error occured id: ${id} doesnt exist` })
        return;
    }

    try {
        const deleteMatchResponse = await matchDb.findByIdAndDelete(id);
        await res.status(200).send(deleteMatchResponse);
    } catch (error) {
        await res.status(404).send({ message: 'Error occured man check again. xd' })
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        await res.status(404).send({ message: `Error occured id: ${id} doesnt exist` })
        return;
    }

    try {
        const deleteUserResponse = await userDb.findByIdAndDelete(id);
        await res.status(200).send(deleteUserResponse);
    } catch (error) {
        await res.status(404).send({ message: 'Error occured man check again. xd' })
    }
}


// update functions

exports.updateMatch = async (req, res) => {
    if (!req.body) {
        res.send({ message: 'Content can not be empty !' })
    } else {
        const id = req.params.id;
        try {
            const updateMatchResponse = await matchDb.findByIdAndUpdate(id, req.body)
            await res.send(updateMatchResponse)
        } catch (error) {
            await res.send({ message: error })
        }
    }
}

exports.updateUser = async (req, res) => {
    if (!req.body) {
        res.send({ message: 'Content can not be empty !' })
    } else {
        const id = req.params.id;
        try {
            const updateUserResponse = await userDb.findByIdAndUpdate(id, req.body)
            await res.send(updateUserResponse)
        } catch (error) {
            await res.send({ message: error })
        }
    }
}


// authentication functions

exports.login = async (req, res) => {
    try {
        let loginResponse = await userDb.findOne({ username: req.body.username })
        if (loginResponse) {
            const payload = {
                id: loginResponse._id,
                expire: Date.now() + 1000 * 60 * 60 * 24 * 7
            }

            const token = jwt.encode(payload, config.jwtSecret)
            console.log('token => ', token)
            res.send({ message: 'Successfully', token: token })
        }
    } catch (error) {
        res.send({ message: 'User doesnt exist' })
    }


    // console.log(loginResponse)

}

exports.register = async (req, res) => {
    userDb.register(
        new userDb({
            email: req.body.email,
            username: req.body.username,
            age: req.body.age,
            favouriteTeam: req.body.favouriteTeam,
            totalPoint: 0,
        }), req.body.password,
        (err, msg) => {
            if (err) {
                console.log('register error', err)
                res.send(err)
            } else {
                res.send({ status: 200, message: 'Successfully', user: msg })
            }
        }
    )
}

exports.profile = async (req, res) => {
    res.json({
        message: 'you made it to the secured profile',
        user: req.user,
        token: req.query.secret_token
    })
}

