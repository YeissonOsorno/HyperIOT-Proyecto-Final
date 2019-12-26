'use strict';
/*From file create the controllers or method for CRUD */
const express = require('express');
const clientModel = require('../models/client.models');
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

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

function loginClient(request, response){
    const params = request.body;
    const userName = params.email;
    const password = params.passwordUser;
    /*Query for check if data exists */
    clientModel.findOne({email : userName},(error,client)=>{
        if (error) return response.status(500).send({ message: 'Error in request, check connection to database' });
        if(client){
            bcrypt.compare(password, client.passwordUser, (error, check) => {
                if (error) return response.status(500).send({ message: "Password couldn't be encrypted" });
                if(check){                
                    if(params.gettoken){
                        return response.status(200).send({token:jwt.createToken(client)})
                    }else{ return response.status(200).send(client)}
                }else{ return response.status(404).send({message:'Client not was identified'})}
            
            });
        }else{return response.status(404).send({message:'The client no exists'})}
    })
}
function getClient(request,response){
    /*We collect the id by URL, when it is by URL we use .params, when it is by post or get we use .body*/
    const clientId = request.params.id;
    clientModel.findById(clientId, (error, client) => {
        /*validate if exists any error with connection that database */
        if(error) return response.status(500).send({message:'was ocurred an error connection or search'})
        if(!client) return response.status(404).send({message:'Not found matches with parameters'})
        return response.status(200).send({client});
    });
}

function updateClient(request, response){
    var clientId = request.params.id;
    var update = request.body;
    clientModel.findByIdAndUpdate(clientId, update, { new: true }, (error, clientUpdated) => {
        if (error) return response.sta(500).send({ message: 'Error request, error in the server' });
        if (!clientUpdated) return response.status(404).send({ message: 'Error, not was updated client' });
        return response.status(202).send({ Client: clientUpdated });
    });
}

module.exports = {
    home,
    saveClient,
    loginClient,
    getClient,
    updateClient
};