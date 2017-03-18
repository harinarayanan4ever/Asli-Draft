var Model = require('../model/MongooseModels'),
adminService = require('../scripts/adminService');
var settings;
function batchJob() {
    //console.log(Model);

    Model.GWTeamModel.remove({}, function(err, data){
        if(err) {
            console.log('error',err);
        }
        Model.TeamModel.find().exec(function(error, teams){
            for(var i=0; i<teams.length; i++) {
                insertToTeamPoints(teams[i]);
            }
        });
    });

}

function insertToTeamPoints(team) {
    var GWTeam = {
        teamId: team._id,
        team: {
            eleven: team.team.eleven,
            subs: team.team.subs
        }
    };
    //console.log(settings);
    console.log(GWTeam);

    Model.GWTeamModel.collection.insert(GWTeam, function(err, data) {
        if(err) {
            console.log(err);
        }
        else {
            console.log('inserted successfully' + data);
        }
    });
}

batchJob();
adminService.updateGW();
