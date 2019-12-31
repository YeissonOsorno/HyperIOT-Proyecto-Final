'use strict';

const mongoose = require('mongoose');
let schema = mongoose.Schema;

const suggestionModel = schema({
    identification: String,
    category: String,
    name : String,
    Description : String,
    task : String,
    status : Boolean

});

module.exports = mongoose.model('sugestion', suggestionModel);