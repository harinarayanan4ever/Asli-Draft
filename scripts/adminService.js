var Model = require('../model/MongooseModels');

var admin = (function() {
    var getAdminObj = function() {
        Model.UsersModel.findOne({}, function(err, data){
            console.log(data);
        });
        Model.AdminDataModel.findOne({}, function(err, data) {
            console.log(data);
            return data;
        });
    };

    return {
        getAdminObj: getAdminObj,
        adminObj: getAdminObj()
    }
})();

module.exports = {gw:20};
