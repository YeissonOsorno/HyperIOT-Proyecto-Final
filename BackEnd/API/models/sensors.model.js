'use strict';
const mongoose = require('mongoose');
let schema = mongoose.Schema;

const sensorModel = schema({
    identification: String,
    name: String,
    description: String,
    quantity: Number,
    status: Boolean
});

module.exports = mongoose.model('sensors', sensorModel);