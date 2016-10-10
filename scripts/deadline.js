var Model = require('../model/MongooseModels'),
globalObj = require('../scripts/adminService');

function batchJob() {

    Model.TeamModel.find().exec(function(error, teams){
        for(var i=0; i<teams.length; i++) {
            insertToTeamPoints(teams[i]);
        }
    });

}

function insertToTeamPoints(team) {
    var GWTeam = {
        teamId: team._id,
        gw: globalObj.gw,
        team: {
            eleven: team.team.eleven,
            subs: team.team.subs
        }
    };

    Model.GWTeamModel.collection.insert(GWTeam, function(err, data) {
        if(err) {
            console.log(err);
        }
        else {
            console.log('inserted successfully' + data);
        }
    })
}

batchJob();
