'use strict';
/*From file create the controllers or method for CRUD */
const express = require('express');
const userModel = require('../models/client.models');

function home(req , res){
    return res.status(200).send({
        message: 'Bienvenido a Home'
    })
}

module.exports = { home };