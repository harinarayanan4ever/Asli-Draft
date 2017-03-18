var express = require('express'),
    app = express();
_ = require('underscore');
sessions = require("client-sessions");

var bodyParser = require('body-parser'),
    session = require('express-session'),
    crypto = require('crypto'),
    adminService = require('./scripts/adminService');

var globalObj;

adminService.getSettings()
    .then(function(data) {
        globalObj = data;
    });

var Model = require('./model/MongooseModels');

//crypto
function hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.use(sessions({
    cookieName: 'session', // cookie name dictates the key name added to the request object
    secret: 'asdlkfjsdfhpdlkf234j#gkljdfg3@#$1oiejr[npahwd1234bflasd%f', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

app
    .use(bodyParser.urlencoded())
    .use(bodyParser.json())
    .use(session({
        secret: 'asdlkfhaklwjhf123oi1n2lkn1u2039i12lk3ncpijp1o2j3'
    }))
    .use(express.static('./public'))
    .get('/api/league_table', function(req, res) {
        Model.TeamModel.find({}, '_id name totalPoints', function(err, teams) {
            res.send({
                teams: teams.sort(function(a, b) {
                    if (a.totalPoints > b.totalPoints) {
                        return -1;
                    } else {
                        return 1;
                    }
                })
            });
            //res.send({teams: teams});
        });
    })
app.use('/api/myTeam', function(req, res) {
        Model.TeamModel.findOne({
            _id: req.session.user.teamId
        }).exec(function(error, team) {
            var playersPopQuery = [{
                path: 'team.squad',
                model: 'players'
            }, {
                path: 'team.eleven',
                model: 'players'
            }, {
                path: 'team.subs',
                model: 'players'
            }];
            Model.TeamModel.populate(team, playersPopQuery, function(err, team) {
                if (err) console.log(err);
                res.send(team);
            });
        });
    })
    .get('/api/points', function(req, res) {
        console.log(globalObj);
        var teamId = parseInt(req.query.teamId || req.session.user.teamId);
        Model.GWTeamModel.findOne({
            teamId: teamId
        }).lean().exec(function(error, team) {
            console.log(team);
            var playersPopQuery = [{
                path: 'team.eleven',
                model: 'players'
            }, {
                path: 'team.subs',
                model: 'players'
            }];
            Model.TeamModel.populate(team, playersPopQuery, function(err, team) {
                if (err) {
                    console.log(err);
                    return;
                }
                var squad = team.team;
                var squadPoints = {};
                var totalPoints = 0;
                for (var property in squad) {
                    var array = ['eleven', 'subs'];
                    if (array.indexOf(property) > -1) {
                        var players = [];
                        for (var i = 0; i < squad[property].length; i++) {
                            var player = squad[property][i].toObject();
                            player.points = player.history[globalObj.gw];
                            if (!player.points) {
                                player.points = {
                                    points: 0
                                };
                            }
                            players.push(player);
                            if (property === 'eleven') {
                                //console.log(player);
                                //console.log(player.displayName);
                                totalPoints += player.points.points;
                            }
                            //player.points = player.history[globalObj.gw];
                            //console.log(player);
                        }
                    }
                    squadPoints[property] = players;
                }
                team.team = squadPoints;
                team.totalPoints = totalPoints;
                res.send(team);
            });
        });
    })
    .get('/login', function(req, res) {
        res.sendfile('public/login.html');
    })
    .post('/login', function(req, res) {
        var user = {
            email: req.body.email,
            password: hash(req.body.password)
        };
        Model.UsersModel.findOne(user, function(err, data) {
            if (data) {
                req.session.userId = data.id;
                req.session.user = data;
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        })
    })
    .get('/logout', function(req, res) {
        req.session.userId = null;
        res.redirect('/login');
    })
    .get('*', function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {
            res.sendfile('public/main.html');
        }
    })
    .put('/submitTeam', function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {
            Model.TeamModel.findOne({
                _id: req.session.user.teamId
            }).exec(function(error, team) {
                console.log(team.team);
                team.team = req.body.team;
                console.log(team.team);
                team.save();
            });
        }
    })
    /*.use(function(req,res,next){
      if(req.session.userId){
        db.findOne({id: req.session.userId}, function(err, data){
          req.user = data;
        });
      }
      next();
      })*/
    .listen(process.env.PORT || 5000);
