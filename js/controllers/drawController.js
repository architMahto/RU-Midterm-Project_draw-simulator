;(function() {
  'use strict';

  angular.module('drawController', [])
    .controller('drawController', drawController)

  // Controller Callback
  function drawController($stateParams, $firebaseObject, $firebaseArray) {
    var drawCtrl = this;

    var ref = new Firebase('https://draw-simulator.firebaseio.com/tournaments/' + $stateParams.id);

    var teamsRef = new Firebase('https://draw-simulator.firebaseio.com/teams');

    // variable to store tournament object
    drawCtrl.tournament = $firebaseObject(ref);
    // variable to store pot size
    drawCtrl.potSize = drawCtrl.tournament.maxTeams/4;
    drawCtrl.teams = $firebaseArray(teamsRef);
    console.log(drawCtrl.teams);

  }
})();
