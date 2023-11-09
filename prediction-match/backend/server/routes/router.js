const express = require('express')
const route = express.Router();

const controller = require('../controller/controller')

// matches API
route.post('/api/match', controller.createMatch)
route.get('/api/match', controller.getMatch)
// route.put('/api/todos/:id', controller.update)
// route.delete('/api/todos/:id', controller.delete)

// users API
route.post('/api/add-user', controller.createUser)
route.get('/api/users', controller.getUser)
// route.delete('/api/users/:id', controller.deleteUser)

// predictions API
route.post('/api/predictions', controller.createPrediction)
route.get('/api/predictions', controller.getPrediction)

module.exports = route;
