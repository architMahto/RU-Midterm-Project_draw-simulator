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
      });
      $urlRouterProvider.otherwise('/');
  }
})();
