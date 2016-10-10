function PointsService(team){
  console.log('display points');
  var self = this;
  this.gkp = [];
  this.def = [];
  this.mid = [];
  this.fwd = [];
  this.subs = [];
  this.squad = [];
  this.displayValues = {1:[3], 2:[2,4], 3:[2,3,4], 4:[1,2,4,5], 5:[1,2,3,4,5], subs:[1,3,4,5]};
  this.formation = {gkp:0, def:0, mid:0, fwd:0};
  this.minReq = {gkp:1, def:3, mid: 2, fwd:1};
  this.belongsToValues = ['eleven', 'subs', 'squad'];
  this.selectedPlayer;
  this.totalPoints = team.totalPoints;
  this.teamName = team.name;

  createPoints = function(){
    $.each(team.team.eleven, function(element, value){
      var player = new Player(value, self.belongsToValues[0], self[value.position.toLowerCase()].length);
      self[player.position].push(player);
      self.formation[player.position] += 1;
    });
    $.each(team.team.subs, function(element, value){
      var player = new Player(value, self.belongsToValues[1], self.subs.length);
      self.subs.push(player);
    });
  }();
  this.displayPoints();
}

PointsService.prototype.displayPoints = function(){
  this.displayRow($('div.gkp'), this.gkp, this.displayValues[this.gkp.length]);
  this.displayRow($('div.def'), this.def, this.displayValues[this.def.length]);
  this.displayRow($('div.mid'), this.mid, this.displayValues[this.mid.length]);
  this.displayRow($('div.fwd'), this.fwd, this.displayValues[this.fwd.length]);
  this.displayRow($('div.bench_row'), this.subs, this.displayValues['subs']);
  $('#totalPoints').html(this.totalPoints);
  $('#teamName').html(this.teamName);
}

PointsService.prototype.displayRow = function(div, players, displayPositions){
  div.children().html('');
  var self = this;
  for(var i=0; i<players.length;i++){
    var playerdiv = $('<div/>');
    var img = $('<img/>',{
      src: '/images/shirt_'+players[i].team+'.png',
    }).addClass('jersey-image').appendTo(playerdiv);

    var name = $('<div/>',{
      html: players[i].name
    }).addClass('player-name').appendTo(playerdiv);
    console.log(players[i]);
    //var infoText = (players[i].points)?
    var info = $('<div/>', {
        html: players[i].points.points,
        style: 'margin-left: 10px;'
    }).appendTo(playerdiv);
    div.children().eq(displayPositions[i]-1).append(playerdiv);
  }
}
