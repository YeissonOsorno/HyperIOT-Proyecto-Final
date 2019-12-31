'use strict';
const express = require('express');
const sensorModel = require('../models/sensors.model');

function home(req , res){
    return res.status(200).send({
        message: 'Welcome to home of sensors'
    })
}

function saveSensor(request, response){
    const params = request.body;
    var sensor = new sensorModel();
    if(params.identification && params.name && params.description && params.quantity){
        sensor.identification = params.identification;
        sensor.name = params.name;
        sensor.description = params.description;
        sensor.quantity = params.quantity;
        
        sensorModel.find({
            $or :[
                {identification : sensor.identification}  
            ]
        }).exec((error, data)=>{
            if (error) return response.status(500).send({ message: 'Error to search data in database' });
            if(data && data.length >= 1){
                return response.status(200).send({ message: ' The data you are trying save already exists' });
            }else{
                sensor.save((error, data) => {
                    if(error) return response.status(404).send({message:'Data not saved, check connection'})
                    if(data){
                        return response.status(202).send({sensor : data})
                    }else{
                        return response.status(404).send('Parameter no match')
                    }
                });
            }
        })
    }else{
        return response.status(200).send({ message: 'Missing fields' });
    }

}

module.exports = {
    home,
    saveSensor
}