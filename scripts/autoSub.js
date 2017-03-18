var Model = require('../model/MongooseModels');
    _     = require('underscore');

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

var replace = function(mainTeam, subs, index, gwNo, position) {
    var replace =  true;
    _.each(subs, function(player, i) {
        if(replace && (!subs[i].history[gwNo] || subs[i].history[gwNo].minsPlayed) > 0 && ((position === 'ANY' && player.position !== 'GKP') || player.position === position)) {
            var temp = _.clone(mainTeam[index]);
            mainTeam[index] = _.clone(subs[i]);
            subs[i] = temp;
            replace = false;
            return;
        }
    });
}

var getFormation = function(team) {
    var formation = {
        GKP: 0,
        DEF: 0,
        MID: 0,
        FWD: 0
    }
    _.each(team, function(player) {
        formation[player.position]++;
    });
    return formation;
}

var autoSub = function(gwNo) {
    console.log('gwNo', gwNo);
    Model.GWTeamModel.find({}).lean().exec(function(error, teams) {

      _.each(teams, function(team) {
          var playersPopQuery = [{path: 'team.eleven', model: 'players'}, {path: 'team.subs', model: 'players'}];
          Model.TeamModel.populate(team, playersPopQuery,function(err, team) {
            if(err) {
                console.log(err);
                return;
            }
            //console.log(Object.keys(team));
            var squad = team.team;
            var squadPoints = {};
            var totalPoints = 0;
            var mainTeam = squad.eleven;
            var subs = squad.subs;
            var minFormation = {GKP: 1, DEF: 3, MID: 2, FWD: 1}
            var formation = getFormation(mainTeam);
            _.each(mainTeam, function(player, index) {
                if(!player.history[gwNo] || player.history[gwNo].minsPlayed === 0 ) {
                    var position = player.position;
                    var replacePosition = (formation[position] === minFormation[position]) ? position : 'ANY';
                    replace(mainTeam, subs, index, gwNo, replacePosition);
                }
            });
            for (var property in squad) {
                var array =['eleven','subs'];
                if (array.indexOf(property) > -1 ){
                    var players = [];
                    for(var i=0; i<squad[property].length; i++) {
                        //console.log(squad[property][i].toObject());
                        var player = squad[property][i].toObject();
                        player.points = player.history[gwNo];
                        if(!player.points) {
                            player.points = {points: 0};
                        }
                        players.push(player);
                        if( property === 'eleven') {
                            //console.log(player);
                            //console.log(player.displayName);
                            totalPoints += player.points.points;
                        }
                        //player.points = player.history[gwNo];
                        //console.log(player);
                    }
                }
                squadPoints[property] = players;
            }
            team.team = squadPoints;
            team.totalPoints = totalPoints;
            console.log(team.teamId, totalPoints);
            Model.TeamModel.findOne({_id: team.teamId}).exec(function(error, team) {
                team.totalPoints += totalPoints;
                team.save();
            });

            Model.GWTeamModel.findOne({teamId: team.teamId}).exec(function(error, liveTeam) {
                console.log(liveTeam);
                liveTeam.team.eleven = _.pluck(squadPoints.eleven, '_id');
                liveTeam.team.subs = _.pluck(squadPoints.subs, '_id');
                console.log(liveTeam);
                liveTeam.save(function(err) {
                  if (err) {
                      return console.log('---------\n', err);
                  }
                });
            });
          });
      });
    });
};


getSettings().then(function(data) {
    autoSub(data.gw);
    //updateGW();
});
