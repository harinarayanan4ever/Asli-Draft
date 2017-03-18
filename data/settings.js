var Model = require('../model/MongooseModels');

Model.AppDataModel.collection.insert({ "_id" : 1, "gw" : 28 }, function(err, data){
    if(err) {
        console.log('error',err);
     }
});
