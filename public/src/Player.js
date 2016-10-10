function Player(player, belongsTo, index){
  console.log(player);
  this.name = player.displayName;
  this.id = player._id;
  this.team = player.teamCode;
  this.position =  player.position.toLowerCase();
  this.replaceLink = '';
  this.belongsTo = belongsTo;
  this.index = index;
  this.points = player.points;
  this.totalPoints = player.total;
  this.nextFix = player.nextFix;
  /*if(player.nextFix){
      this.nextFix = (function() {
          var teamAbbr = {
              "Arsenal": "ARS",
              "Aston Villa": "AVL",
              "Bournemouth": "BOU",
              "Chelsea": "CHE",
              "Crystal Palace": "CRY",
              "Everton": "EVE",
              "Leicester": "LEI",
              "Liverpool": "LIV",
              "Manchester City": "MCI",
              "Man Utd": "MUN",
              "NewCastle United": "NEW",
              "Norwich": "NOR",
              "Southampton": "SOU",
              "Spurs": "TOT",
              "Stoke": "STK",
              "Sunderland": "SUN",
              "Swansea": "SWA",
              "Watford": "WAT",
              "West Brom": "WBA",
              "West Ham": "WHU"
          };
          var team = player.nextFix.split('(')[0].trim();
          return player.nextFix.replace(team, teamAbbr[team]);
      })();
  }*/
}
