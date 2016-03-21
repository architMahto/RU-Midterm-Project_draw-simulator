(function() {
  'use strict'

  angular.module('drawApp', ['tournamentControllers', 'drawControllers', 'ui.router'])
    .config(mainRouter);

  function mainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tournamentSelector', {
        url: '/',
        templateUrl: '../views/tournamentSelector.html',
        controller: 'tournamentController'
      });
      $urlRouterProvider.otherwise('/');
  }
})();
