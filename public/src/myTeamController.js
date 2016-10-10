function MyTeamController($scope, MyTeam, $http) {
    /*_.extend($scope, {
        cancelDisabled: true,
        submitDisabled: false
    });*/
    console.log('in controller');

    MyTeam.get(function(data){
        $scope.team = new Team(data.team);
    });

    var getIds = function(players, ids){
      var ids = ids || [];
      $.each(players, function(id, player){
          ids.push(player.id);
      });
      return ids;
    };

    $scope.submitTeam = function() {
        //$scope.submitDisabled =  true;
        var team = {};
        var ids = [];
        getIds($scope.team.gkp, ids);
        getIds($scope.team.def, ids);
        getIds($scope.team.mid, ids);
        getIds($scope.team.fwd, ids);
        team.eleven = ids;
        team.subs   = getIds($scope.team.subs, []);
        team.squad  = getIds($scope.team.squad, []);
        $http({
            url: '/submitTeam',
            data: {team: team},
            method: 'PUT'
        }).then(function() {
            alert('team saved successfully');
        });
    };
}

angular.module('Fantasy').controller('MyTeamController', MyTeamController);
