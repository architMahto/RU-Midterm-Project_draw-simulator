;(function() {
  'use strict';

  angular.module('drawController', [])
    .controller('drawController', drawController)

  // Controller Callback
  function drawController($stateParams, $firebaseObject, $firebaseArray) {
    var drawCtrl = this;

    drawCtrl.tournament = {};
    drawCtrl.potSize = null;
    drawCtrl.teams = [];

    // drawCtrl.pots
    drawCtrl.pot1 = [];
    drawCtrl.pot2 = [];
    drawCtrl.pot3 = [];
    drawCtrl.pot4 = [];

    // calls to Firebase databases
    var ref = new Firebase('https://draw-simulator.firebaseio.com/tournaments/' + $stateParams.id);
    var teamsRef = new Firebase('https://draw-simulator.firebaseio.com/teams');

    // variable to store tournament object
    // drawCtrl.tournament = $firebaseObject(ref);
    $firebaseObject(ref).$loaded().then(getTournament);

    function getTournament(data) {
      // set data of tournament object to drawCtrl.tournament
      drawCtrl.tournament = data;
      // variable to store pot size
      drawCtrl.potSize = drawCtrl.tournament.maxTeams/4;
    }

    // variable to store 4 pots of teams
    // set teams from firebase array to drawCtrl.teams
    $firebaseArray(teamsRef).$loaded().then(getTeams);

    function getTeams(data) {
      drawCtrl.teams = _.sortBy(data, 'nationalCoefficient').reverse();

      // Add host(s) to pot 1
      for (var i = 0; i < drawCtrl.teams.length; i++) {
        // console.log(drawCtrl.teams[i]);
        if (drawCtrl.teams[i].host) {
          // console.log(drawCtrl.teams[i]);
          drawCtrl.pot1.push(drawCtrl.teams[i]);
        }
      }

      // index to keep track of previous pot's exit index
      var k = 0;

      // Add teams to pot 1
      for (var i = 0; i < drawCtrl.teams.length; i++) {
        if (!drawCtrl.teams[i].host) {
          drawCtrl.pot1.push(drawCtrl.teams[i]);
        }
        if (drawCtrl.pot1.length === drawCtrl.potSize) {
          k = i;
          break;
        }
      }

      // Add teams to pot 2
      for (var i = (k+1); i < drawCtrl.teams.length; i++) {
        if (!drawCtrl.teams[i].host) {
          drawCtrl.pot2.push(drawCtrl.teams[i]);
        }
        if (drawCtrl.pot2.length === drawCtrl.potSize) {
          k = i;
          break;
        }
      }

      // Add teams to pot 3
      for (var i = (k+1); i < drawCtrl.teams.length; i++) {
        if (!drawCtrl.teams[i].host) {
          drawCtrl.pot3.push(drawCtrl.teams[i]);
        }
        if (drawCtrl.pot3.length === drawCtrl.potSize) {
          k = i;
          break;
        }
      }

      // Add teams to pot 4
      for (var i = (k+1); i < drawCtrl.teams.length; i++) {
        if (!drawCtrl.teams[i].host) {
          drawCtrl.pot4.push(drawCtrl.teams[i]);
        }
        if (drawCtrl.pot4.length === drawCtrl.potSize) {
          k = i;
          break;
        }
      }
    }

  }
})();
