angular.module('Fantasy')
  .controller('LeagueController', function($scope, League, Points){
    League.get(function(data){
      $scope.teams= data.teams;
    });

    $scope.showPoints = false;

    $scope.getPoints = function(id) {
        Points.get(function(data){
          $scope.team= data;
          $scope.showPoints = true;
          var points = new PointsService(data);
          console.log(points);
        });
    };

  });
