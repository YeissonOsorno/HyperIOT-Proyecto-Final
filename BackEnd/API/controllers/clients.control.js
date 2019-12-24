'use strict';
/*From file create the controllers or method for CRUD */
const express = require('express');
const clientModel = require('../models/client.models');
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

function home(req , res){
    return res.status(200).send({
        message: 'Welcome to Home Client'
    })
}

function saveClient(request , response){
    const params = request.body;
    var client= new clientModel();
    if(params.identification && params.name && params.lastName && params.email && params.passwordUser ){
        client.identification = params.identification;
        client.name = params.name;
        client.lastName = params.lastName;
        //client.profileImage = params.profileImage;
        //client.rolUser = params.rolUser;
        client.email = params.email;
        client.passwordUser = params.passwordUser;
        //client.statusUser = true;
        /*Sentencia para consultar la base de datos */
        clientModel.find({$or:[
            {identification : client.identification}
        ]})
        .exec((error,clientRow)=>{
            if (error) return response.status(500).send({ message: 'Error in request to server' });
            if (clientRow && clientRow.length >= 1) {response.status(200).send({ message: 'The client you are trying save already exists' });} 
            else{
                bcrypt.hash(params.passwordUser, null, null, (error, hash) => {
                    client.passwordUser = hash;
                    /* save client */
                    client.save((error, clientStored) => {
                        if (error) return response.status(500).send({ message: 'an ocurred error with request to server' });
                        if(clientStored){
                            return response.status(201).send({clientSaved: clientStored });                            
                        }else{
                            return response.status(400).send({ message: 'Error , client not was saved' });
                        }
                    });
                });
            }
        })
    }else{ return response.status(200).send({message:'You must fill required fields'})}
    
}

module.exports = {
    home,
    saveClient
};