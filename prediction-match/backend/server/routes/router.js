const express = require('express')
const route = express.Router();

const controller = require('../controller/controller')

// matches API
route.post('/api/match', controller.createMatch)
route.get('/api/match', controller.getMatch)
route.put('/api/match/:id', controller.updateMatch)
route.delete('/api/match/:id', controller.deleteMatch)

// users API
route.post('/api/add-user', controller.createUser)
route.get('/api/users', controller.getUser)
route.put('/api/users/:id', controller.updateUser)
route.delete('/api/users/:id', controller.deleteUser)

// predictions API
route.post('/api/predictions', controller.createPrediction)
route.get('/api/predictions/:id', controller.getPrediction)
route.get('/api/all-predictions', controller.getAllPrediction)

// 

route.put('/api/finish-match', controller.finishMatch)

module.exports = route;
