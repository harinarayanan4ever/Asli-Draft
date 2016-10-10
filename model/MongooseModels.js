var mongoose = require('mongoose');

module.exports = (function(){
    mongoose.connect('mongodb://admin:admin@ds053186.mlab.com:53186/fantasy_draft');
    var Schema = mongoose.Schema;

    var TeamSchema = new Schema({
      _id: Number,
      name: String,
      team: {
        eleven: [{type:Number, ref:'players'}],
        subs: [{type:Number, ref:'players'}],
        squad: [{type:Number, ref:'players'}]
      },
      totalPoints: Number
    });
    var TeamModel = mongoose.model('teams', TeamSchema);

    var GWTeam = new Schema({
      _id: Number,
      gw: Number,
      team: {
        eleven: [{type:Number, ref:'players'}],
        subs: [{type:Number, ref:'players'}]
      },
      totalPoints: Number
    });
    var GWTeamModel = mongoose.model('gw_teams', GWTeam);

    var EplTeamsModel = mongoose.model('epl_teams',{name: String, id: Number, abbr: String});

    var playersSchema = new Schema({
      _id: Number,
      displayName: String,
      history: {},
      teamCode: {
        type: Number,
        ref: 'epl_teams'
      },
      total: Number,
      curFixture: String,
      nextFixture: String,
      status: String,
      news:String,
      position: String,
      price: Number,
      points: {}
    });

    var PlayersModel = mongoose.model('players', playersSchema);

    var UsersModel = mongoose.model('users', {email: String, password: String, teamId: Number});

    //var AdminDataModel = mongoose.model('admin',{_id: Number, gw: Number, name: String});
    var AppDataModel = mongoose.model('app_data',{_id: Number, gw: Number});

    return {
        TeamModel: TeamModel,
        UsersModel: UsersModel,
        EplTeamsModel: EplTeamsModel,
        PlayersModel: PlayersModel,
        GWTeamModel: GWTeamModel
    }
})();
