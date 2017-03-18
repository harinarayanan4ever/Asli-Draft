var http = require('http');
var Player = require('../scripts/Player');
var Model = require('../model/MongooseModels');
var fs = require('fs');
var https = require('https');

var insertPlayers = function(players) {
    Model.PlayersModel.collection.insert(players, function(err, data){
        if(err) {
            console.log('error',err);
        }
    });
}

var fetchPlayerDataFromFPL = function(allPlayers) {
    var players = [];
    for(var i = 1; i < allPlayers.length; i++){
        (function(id){

            var options = {
                host: 'fantasy.premierleague.com',
                path: '/drf/element-summary/'+i
            };

            var req = https.request(options, function(res, err) {
                if(err) {
                    console.log('error', err);
                }
                res.setEncoding('utf-8');

                var responseString = '';

                res.on('data', function(data) {
                  responseString += data;
                });

                res.on('end', function() {
                    var playerObj = JSON.parse(responseString);
                    players.push(new Player(playerObj, allPlayers[id - 1]));
                });
            });
            req.end();
        })(i);
    }

    setTimeout(function() {
        players.sort(function(a,b){
          if (a._id < b._id)
            return -1;
          if (a._id > b._id)
            return 1;
          return 0;
        });
        Model.PlayersModel.remove({}, function(err, data){
            if(err) {
                console.log('error',err);
            }
            console.log(players);
            insertPlayers(players);
        });
    },60000);
}

var fetchAllPlayers = function() {
    var options = {
        host: 'fantasy.premierleague.com',
        path: '/drf/elements/',
        method: 'GET',
        headers: {}
    };

    var req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
          responseString += data;
        });

        res.on('end', function() {
            fetchPlayerDataFromFPL(JSON.parse(responseString));
            //test(JSON.parse(responseString));
        });
    });
    req.end();
}

var test = function (allPlayers) {
    var options = {
        host: 'fantasy.premierleague.com',
        path: '/drf/element-summary/574'
    };

    var req = https.request(options, function(res, err) {
        if(err) {
            console.log('error', err);
        }
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
          responseString += data;
        });

        res.on('end', function() {
            var playerObj = JSON.parse(responseString);
            console.log(new Player(playerObj, allPlayers[573]));
        });
    });
    req.end();
}

fetchAllPlayers();
