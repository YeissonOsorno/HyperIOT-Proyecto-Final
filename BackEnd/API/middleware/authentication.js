'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'secret_key_client';

exports.ensureAuthentication =  function(request, response,next){
    /*Check parameter of verification */
    if(!request.headers.authorization){
        return response.status(403).send({ message: 'can´t verify identification parameters' });
    }
    /*clean paremeter of token */
    var token = request.headers.authorization.replace(/['"]+/g, '');
    /*Try decode payload send to service jwt */
    try
    {
        var payload = jwt.decode(token, secret);
        /*we verify date expiration */
        if(payload.exp <=moment().unix()){
            return response.status(401).send({ message: 'Token has expirated, Restart sesion' });
        }
    }catch(exception){ return response.status(404).send({message:'Token not valid, please login'})}
    /*Return payload service with autorization */
    request.client = payload;
    next();
}