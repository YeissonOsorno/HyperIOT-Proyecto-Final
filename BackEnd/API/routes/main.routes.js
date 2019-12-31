'use strict';

const express = require('express');
const clientController = require('../controllers/clients.control');
const sensorController = require('../controllers/sensors.control');
const API = express.Router(); // Load method of express, by name Router,for methods GET and POST
const md_auth = require('../middleware/authentication');

//Routes Client
API.get('/homeClient', clientController.home);
API.post('/saveClient', clientController.saveClient);
API.post('/tokenClient', clientController.loginClient);
API.post('/getClient/:id', md_auth.ensureAuthentication, clientController.getClient);
API.put('/updateClient/:id', md_auth.ensureAuthentication, clientController.updateClient);
//Routes Sensors
API.get('/homeSensor', sensorController.home);
API.post('/saveSensor', sensorController.saveSensor);
API.get('/getSensor/:id', sensorController.getSensor);
module.exports = API;