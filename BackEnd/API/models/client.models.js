'use strict';

const mongoose = require('mongoose');
let schema = mongoose.Schema;

const clientSchema = schema({
    
    identification : String,
    name : String,
    lastName : String,
    profileImage : String,
    rolUser : String,
    email : String,
    passwordUser : String,
    statusUser  : Boolean
    
});

module.exports = mongoose.model('client', clientSchema);