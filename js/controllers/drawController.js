;(function() {
  'use strict';

  angular.module('drawController', [])
    .controller('drawController', drawController)

  // Controller Callback
  function drawController($stateParams, $firebaseObject) {
    var drawCtrl = this;

    var ref = new Firebase('https://draw-simulator.firebaseio.com/tournaments/' + $stateParams.id);

    // variable to store tournament object
    drawCtrl.tournament = $firebaseObject(ref);
    console.log(drawCtrl.tournament);
    drawCtrl.potSize = drawCtrl.tournament.maxTeams/4;

  }
})();
