'use strict';

const mongoose = require('mongoose');
let schema = mongoose.Schema;
const sensor = mongoose.model('sensors');

const dataModel = schema({
    category : String,
    value : Number,
    sensor : { type: Schema.ObjectId, ref :'sensors'}
});

module.exports = mongoose.model('data', dataModel);
