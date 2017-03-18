var fs = require('fs');
var Model = require('../model/MongooseModels');

fs.readFile('../data/users.json', 'utf8', function (err, users) {
  if (err) throw err;
  console.log(users);
  Model.UsersModel.collection.insert(users, function(err, data){
      if(err) {
          console.log('error',err);
      }
  });
});

fs.readFile('../data/teams.json', 'utf8', function (err, teams) {
  if (err) throw err;
  console.log(teams);
  Model.TeamModel.collection.insert(teams, function(err, data){
      if(err) {
          console.log('error',err);
      }
  });
});
