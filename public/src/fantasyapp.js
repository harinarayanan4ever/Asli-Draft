angular.module('Fantasy', ['ngRoute', 'ngResource'])
  .config(function($routeProvider, $locationProvider){
    console.log('module');
    $routeProvider
      .when('/league', {
        controller: 'LeagueController',
        templateUrl: 'views/league.html'
      })
      .when('/myTeam',{
        templateUrl: 'views/myTeam.html'
      })
      .when('/points',{
        controller: 'PointsController',
        templateUrl: 'views/points.html'
      })
      .otherwise({
        redirectTo: '/myTeam'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

  });
