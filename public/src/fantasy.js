function Team(team){
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

  createTeam = function(){
    $.each(team.eleven, function(element, value){
      var player = new Player(value, self.belongsToValues[0], self[value.position.toLowerCase()].length);
      self[player.position].push(player);
      self.formation[player.position] += 1;
    });
    $.each(team.subs, function(element, value){
      var player = new Player(value, self.belongsToValues[1], self.subs.length);
      self.subs.push(player);
    });
    $.each(team.squad, function(element, value){
      var player = new Player(value, self.belongsToValues[2],self.squad.length);
      self.squad.push(player);
    });
  }();
  this.displayTeam();
}

Team.prototype.displayTeam = function(){
  this.displayRow($('div.gkp'), this.gkp, this.displayValues[this.gkp.length]);
  this.displayRow($('div.def'), this.def, this.displayValues[this.def.length]);
  this.displayRow($('div.mid'), this.mid, this.displayValues[this.mid.length]);
  this.displayRow($('div.fwd'), this.fwd, this.displayValues[this.fwd.length]);
  this.displayRow($('div.bench_row'), this.subs, this.displayValues['subs']);
  this.displaySquad();
}

Team.prototype.displayRow = function(div, players, displayPositions){
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
    var infoDiv = $('<div/>').appendTo(playerdiv);
    $('<span>', {html: players[i].nextFix, class:'fix-info' }).appendTo(infoDiv);
    var replaceLink = $('<a/>',{
      html: 'replace'
    }).addClass('replaceLink').appendTo(infoDiv);
    players[i].replaceLink = replaceLink;
    replaceLink.on('click',(function(player){
       return function(){self.identifyPossibleReplacements(player)};
    })(players[i]));
    div.children().eq(displayPositions[i]-1).append(playerdiv);
  }
}

Team.prototype.displaySquad = function(){
  var table = {
    gkp: $('#squad-gkp').find('tbody'),
    def: $('#squad-def').find('tbody'),
    mid: $('#squad-mid').find('tbody'),
    fwd: $('#squad-fwd').find('tbody')
  };
  //clear squad tables
  $('.squad-table').find('tbody').html('');
  var self = this;
  $.each(this.squad, function(id,player){
    var tr = $('<tr/>').addClass('squad-player');
    var td = $('<td/>',{
      html: player.name
    }).appendTo(tr);

    var replaceLink = $('<a>',{
      html:' [replace] ',
      href: '#',
    }).addClass('replaceLink-squad').appendTo(td);
    player.replaceLink = replaceLink;
    table[player.position].append(tr);
    replaceLink.on('click',(function(player){
       return function(){self.identifyPossibleReplacements(player)};
    })(player));
    $('<td/>',{
      html: player.totalPoints
    }).appendTo(tr);
    $('<td/>',{
      html: player.nextFix
    }).appendTo(tr);
  })
}

Team.prototype.identifyPossibleReplacements = function(player){

  if(this.selectedPlayer){
    this.replaceSelectedPlayer(player);
    return;
  }

  this.selectedPlayer = player;
  player.replaceLink.hide();
  var playerFrom = player.belongsTo;
  if(playerFrom === 'eleven'){

  }
  var allowedPositions = this.getAllowedPositions(player);
  $.each(this.getAllPlayers(), function(id, player){
    var allowedPosArray = allowedPositions[player.belongsTo];

    if(allowedPosArray && allowedPosArray.length > 0 && allowedPosArray.indexOf(player.position) > -1){
      //do nothing
    }else{
      player.replaceLink.hide();
    }
  });
}

Team.prototype.replaceSelectedPlayer = function(player){
  var selectedPlayer = this.selectedPlayer;
  if(selectedPlayer.belongsTo === 'eleven'){
    var playerIndex = player.index;
    if(player.position === selectedPlayer.position){
      this[selectedPlayer.position].splice(selectedPlayer.index,1,player);
      this.swapIndex(player, selectedPlayer);
    }else{
      this[selectedPlayer.position].splice(selectedPlayer.index,1);
      this[player.position].push(player);
      //for formation
      this.formation[selectedPlayer.position]--;
      this.formation[player.position]++;
    }
    this[player.belongsTo].splice(playerIndex,1,selectedPlayer);
    this.restructureIndex(this[selectedPlayer.position]);
    this.restructureIndex(this[player.belongsTo]);
    this.swapBelongsTo(player, selectedPlayer);
  }
  else{
    var playerIndex = player.index;
    this[selectedPlayer.belongsTo].splice(selectedPlayer.index,1,player);
    if(this[player.belongsTo]){
      this[player.belongsTo].splice(playerIndex,1,selectedPlayer);
      this.swapIndex(player, selectedPlayer);
    }else{
      if(player.position === selectedPlayer.position){
        this[player.position].splice(playerIndex,1,selectedPlayer);
        this.swapIndex(player, selectedPlayer);
      }
      else{
        this[player.position].splice(playerIndex, 1);
        this[selectedPlayer.position].push(selectedPlayer);
        this.restructureIndex(this[selectedPlayer.position]);
        this.restructureIndex(this[player.position]);
        //for formation
        this.formation[selectedPlayer.position]++;
        this.formation[player.position]--;
      }
    }
    this.swapBelongsTo(player, selectedPlayer);
  }
  this.displayTeam();
  this.selectedPlayer = undefined;
}

Team.prototype.swapIndex =function(player1, player2){
  var playerIndex = player1.index;
  player1.index = player2.index;
  player2.index = playerIndex;
}

Team.prototype.swapBelongsTo = function(player1,player2){
  var belongsTo = player1.belongsTo;
  player1.belongsTo = player2.belongsTo;
  player2.belongsTo = belongsTo;
}

Team.prototype.restructureIndex = function(players){
  $.each(players, function(id, player){
    player.index = id;
  });
}

Team.prototype.getAllowedPositions = function(player){
  /*var allowed = {};
  var allowedBelongsToValues = [];
  if(playerFrom === this.belongsToValues[0] || playerFrom === this.belongsToValues[2]){
    allowedBelongsToValues = this.belongsToValues.splice(playerFrom, 1);
  }else{
    allowedBelongsToValues = this.belongsToValues;*/

  var playerFrom = player.belongsTo;
  var allowedPositions = {}
  var self = this;
  if(playerFrom === this.belongsToValues[0]){
    if(this.formation[player.position]-1 < this.minReq[player.position]){
      allowedPositions['subs'] = [player.position];
    }else{
      allowedPositions['subs'] = ['def', 'mid', 'fwd'];
    }
    allowedPositions['squad'] = [player.position];
  }else if(playerFrom === this.belongsToValues[1]){
    if(player.position !== 'gkp'){
      allowedPositions['subs'] = ['def', 'mid', 'fwd'];
    }
    var formation = JSON.parse(JSON.stringify(this.formation));
    formation[player.postion]++;
    var allowedEleven = [];
    $.each(formation, function(key,value){
      if(self.minReq[key] != value){
        allowedEleven.push(key);
      }
    });
    allowedPositions['eleven'] = allowedEleven;
    allowedPositions['squad'] = [player.position];
  }else{
    allowedPositions['eleven'] = [player.position];
    allowedPositions['subs'] = [player.position];
  }

  return allowedPositions;
}

Team.prototype.getAllPlayers = function(){
  var players = [];
  players.pushArray(this.gkp);
  players.pushArray(this.def);
  players.pushArray(this.mid);
  players.pushArray(this.fwd);
  players.pushArray(this.subs);
  players.pushArray(this.squad);
  return players;
}

Array.prototype.pushArray = function(arr) {
    this.push.apply(this, arr);
};
