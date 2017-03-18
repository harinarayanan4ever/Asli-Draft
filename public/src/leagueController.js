angular.module('Fantasy')
  .controller('LeagueController', function($scope, League, Points, $http){
    League.get(function(data){
      $scope.teams= data.teams;
    });

    $scope.showPoints = false;

    $scope.getPoints = function(id) {
        /*Points.get(function(data){
          $scope.team= data;
          $scope.showPoints = true;
          var points = new PointsService(data);
          console.log(points);
      });*/

      $http.get('/api/points', {
        params: {teamId: id}
      }).then(function(response) {
          $scope.team= response.data;
          $scope.showPoints = true;
          var points = new PointsService(response.data);
      });
    };

  });
