(function() {
  'use strict'

  angular.module('drawApp', ['tournamentControllers', 'selectControllers', 'ui.router'])
    .config(mainRouter);

  function mainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tournamentSelector', {
        url: '/',
        templateUrl: '../views/tournamentSelector.html',
        controller: 'tournamentController'
      })
      .state('teamSelector', {
        url: '/selectTeams/:name?club?maxTeams',
        templateUrl: '../views/teamSelector.html',
        controller: 'selectController'
      })
      $urlRouterProvider.otherwise('/');
  }
})();
