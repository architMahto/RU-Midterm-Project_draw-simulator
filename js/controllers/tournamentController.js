;(function() {
  'use strict';

  angular.module('tournamentControllers', [])
    .controller('tournamentController', tournamentController)

  // Controller Callback
  function tournamentController() {
    var tournamentCtrl = this;

    tournamentCtrl.tournaments = ['UEFA Champions League', 'UEFA European Championship'];
  }
})();
