(function() {
  'use strict'

  angular.module('drawApp', ['tournamentControllers', 'selectController', 'drawController', 'ui.router', 'firebase'])
    .config(mainRouter);

  function mainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tournamentSelector', {
        url: '/',
        templateUrl: '../views/tournamentSelector.html'
      })
      .state('teamSelector', {
        url: '/selectTeams/:id/',
        templateUrl: '../views/teamSelector.html'
      })
      .state('draw', {
        url: '/draw/:id/',
        templateUrl: '../views/draw.html'
      })
      $urlRouterProvider.otherwise('/');
  }
})();
