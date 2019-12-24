'use strict';

const express = require('express');
const testController = require('../controllers/test.control');
const API = express.Router(); // Load method of express, by name Router,for methods GET and POST
//const md_auth = require('../middleware/autenticacion');

//Routes test
API.get('/home', testController.home);


module.exports = API;