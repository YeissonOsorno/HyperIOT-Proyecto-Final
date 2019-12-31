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

function getSensor(request, response){
    const sensorId = request.params.id;
    sensorModel.findById(sensorId,(error,sensor)=>{
        if (error) return response.status(500).send({ message: 'Was ocurred error in connection with database' });
        if (!sensor) return response.status(404).send({ message: 'Not found matches with parameters' });
        return response.status(200).send({sensor});
    })
}

function updateSensor(request,response){
    const sensorId = request.params.id;
    const update = request.body;
    sensorModel.findByIdAndUpdate(sensorId, update, { new: true }, (error, sensorUpdated) => {
        if (error) return response.status(500).send({ message: 'Was ocurred error in server' });
        if (!sensorUpdated) return response.status(404).send({ message: 'The sensor wasn´t updtaded' });
        return response.status(200).send({ sensorUpdated });
    });
}

module.exports = {
    home,
    saveSensor,
    getSensor,
    updateSensor
}
    