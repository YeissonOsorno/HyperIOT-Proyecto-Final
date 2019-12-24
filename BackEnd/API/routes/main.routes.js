'use strict';

const express = require('express');
const userController = require('../controllers/clients.control');
const API = express.Router(); // Load method of express, by name Router,for methods GET and POST
//const md_auth = require('../middleware/autenticacion');

//Routes test
API.get('/home', userController.home);

module.exports = API;