(function() {
  'use strict'

  angular.module('drawApp', ['tournamentControllers', 'selectController', 'drawController', 'ui.router', 'firebase'])
    .config(mainRouter);

  function mainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tournamentSelector', {
        url: '/',
        templateUrl: '../views/tournamentSelector.html'
        // controller: 'tournamentController'
      })
      .state('teamSelector', {
        url: '/selectTeams/:id/',
        templateUrl: '../views/teamSelector.html'
        // controller: 'selectController'
      })
      .state('draw', {
        url: '/draw',
        templateUrl: '../views/draw.html'
        // controller: 'drawController'
      })
      $urlRouterProvider.otherwise('/');
  }
})();
