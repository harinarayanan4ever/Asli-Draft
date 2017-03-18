var Model = require('../model/MongooseModels');
_       = require('underscore');

var getSettings = function() {
    return Model.AppDataModel.findOne({_id: 1}, function(err, data){
        console.log(data);
        return data;
    });
};

var updateGW = function() {
    Model.AppDataModel.findOne({_id: 1}, function(err, data){
        data.gw += 1;
        data.save(function(err, data) {
            if(!err) {
                console.log('updated gw', data);
            }
        });
    });
};

module.exports = {
    getSettings: getSettings,
    updateGW: updateGW
};
