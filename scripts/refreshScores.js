var gulp  =  require('gulp');
var http = require('http');
var Player = require('../scripts/Player');
var Model = require('../model/MongooseModels');

gulp.task('default', function(){
    var players = [];

    for(var i = 1; i < 650; i++){
        (function(id){
            var options = {
                host: 'fantasy.premierleague.com',
                path: '/web/api/elements/'+i+'/'
            };

            http.get(options, function(response,err) {
                var body = '';
                if(response.statusCode === 200){
                    response.on('data', function(d) {
                        body += d;
                    });
                    response.on('end', function() {
                        players.push(new Player(JSON.parse(body)));
                    });
                }else{

                }
            });
        })(i);
    }

    setTimeout(function(){
        players.sort(function(a,b){
          if (a._id < b._id)
            return -1;
          if (a._id > b._id)
            return 1;
          return 0;
        });
        Model.PlayersModel.remove({});
        Model.PlayersModel.insert(players);
        //fs.writeFile('players.json', JSON.stringify(players));
    },60000);
});
