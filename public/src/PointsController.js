angular.module('Fantasy')
  .controller('PointsController', function($scope, Points){
     console.log('asdf');
    Points.get(function(data){
      $scope.team= data;
      console.log(data);
      var points = new PointsService(data);
      console.log('points created');
    });
});
