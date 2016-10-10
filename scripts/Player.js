var position = { 1: 'GKP', 2 : 'DEF', 3: 'MID', 4 : 'FWD'};
var team = {1: "Arsenal", 2: "Bournemouth", 3: "Burnley", 4: "Chelsea", 5: "Crystal Palace", 6: "Everton", 7: "Hull City", 8: "Leicester", 9: "Liverpool", 10: "Man City", 11 :"Man Utd", 12: "Middlesborough", 13: "Southampton", 14: "Stoke", 15: "Sunderland", 16: "Swansea", 17: "Spurs", 18: "Watford", 19: "West Brom", 20: "West Ham"}

function Player(player, playerInfo){
    this._id = playerInfo.id;
    this.displayName = playerInfo.web_name;
    /*this.history = (function(){
        var history = player.fixture_history.all;
        var bps_history = {};
        for(var i = 0; i < history.length; i++){
            var info = {
                minsPlayed: history[i][3],
                points: history[i][16]
            };
            bps_history[history[i][1]] =  info;
        }
        return bps_history;
    })();*/
    this.total = playerInfo.bps;
    this.curFix = playerInfo.current_fixture;
    this.nextFix = (function(){
    var nextFixture = player.fixtures[0];
        return nextFixture.opponent_short_name + ' (' + (nextFixture.is_home ? 'H' : 'A') + ')';
    })();
    this.teamCode = playerInfo.team;
    this.team = team[playerInfo.team];
    this.status = playerInfo.status;
    this.news = playerInfo.news;
    this.position = position[playerInfo.element_type];
}

module.exports = Player;
