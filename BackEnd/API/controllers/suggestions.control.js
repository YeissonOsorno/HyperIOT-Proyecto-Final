'use strict';

const suggestionModel = require('../models/suggestions.models');

function home(request,response){
    return response.status(200).send({ message: 'Welcome to Home of Suggestions' });
}

function saveSuggestion(request, response){
    const params = request.body;
    const suggestion = new suggestionModel();
    if(params.identification && params.category && params.name && params.description && params.task){
        suggestion.identification = params.identification;
        suggestion.category = params.category;
        suggestion.name = params.name;
        suggestion.description = params.description;
        suggestion.task = params.task;
        suggestion.status = params.status;
        
        suggestionModel.find({
            $or :[
                { identification : suggestion.identification }
            ]
        }).exec((error, data)=>{
            if (error) return response.status(500).send({ message: 'Was ocurred error searching in database' });
            if (data && data.length >= 1){
                return response.status(200).send({ message: 'The data you are trying save already exists' });
            }else{
                suggestion.save((error, suggestionData)=>{
                    if (error) return response.status(404).send({ message: 'Sugestion not saved, Check connection' });
                    if(data){
                        return response.status(202).send({suggestion : suggestionData})
                    }else{
                        return response.status(404).send({ message: 'parameters not match' });
                    }
                })
            }
            
        })
    }else{
        return response.status(404).send({message:'Missing Fields'})
    }

}

function getSuggestion(request, response){
    const suggestionId = request.params.id;
    suggestionModel.findById(suggestionId, (error, suggestion) => {
        if (error) return response.status(500).send({ message: 'Was ocurred error with database' });
        if (!suggestion) return response.status(404).send({ message: 'Not found matches with parameters' });
        return response.status(202).send({ suggestion });
    });
}

function updateSuggestion(request,response){
    const suggestionId = request.params.id;
    const update = request.body;
    suggestionModel.findByIdAndUpdate(suggestionId,update,{new:true},(error,suggestionUpdated)=>{
        if (error) return response.status(500).send({ message: 'Was ocurred error in server' });
        if(!suggestionUpdated) return response.status(404).send({message:'Suggestion Wasn´t updated '})
        return response.status(202).send({ suggestionUpdated });
    })
}

module.exports =  {
    home,
    saveSuggestion,
    getSuggestion,
    updateSuggestion
}