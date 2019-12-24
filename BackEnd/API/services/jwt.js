'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'secret_key_client';
exports.createToken = function(client){
    let payload = {
        sub :client.id,
        identification : client.identification,
        name : client.name,
        lastName : client.lastName,
        email : client.email,
        passwordUser : client.passwordUser,        
        
        iat : moment().unix(),
        exp : moment().add(12,'hours').unix
        
    
    }
    return jwt.encode(payload, secret);
}