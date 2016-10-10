angular.module('Fantasy')
  .factory('League', function($resource){
    return $resource('/api/league_table/',{'query': { method: 'GET'}});
  })
  .factory('MyTeam', function($resource){
    return $resource('/api/myTeam/');
  })
  .factory('Points', function($resource){
     console.log('points');
    return $resource('/api/points/');
  });
