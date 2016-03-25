;(function() {
  'use strict';

  angular.module('tournamentControllers', ["firebase"])
    .controller('tournamentController', tournamentController)

  // Controller Callback
  function tournamentController($http, $firebaseArray) {
    var tournamentCtrl = this;

    var ref = new Firebase('https://draw-simulator.firebaseio.com/tournaments');

    // 2D array of tournament objects
    tournamentCtrl.tournaments = [$firebaseArray(ref)];

    tournamentCtrl.currentFederation = 0;
    tournamentCtrl.currentTournament = 0;

    /* Functionality to browse through federations */
    tournamentCtrl.moveFederationLeft = function () {
      if (tournamentCtrl.currentFederation == 0) {
        tournamentCtrl.currentFederation = (tournamentCtrl.tournaments.length-1);
        tournamentCtrl.currentTournament = 0;
      } else {
        tournamentCtrl.currentFederation -= 1;
        tournamentCtrl.currentTournament = 0;
      }
      // console.log(tournamentCtrl.tournaments);
    }

    tournamentCtrl.moveFederationRight = function () {
      if (tournamentCtrl.currentFederation == (tournamentCtrl.tournaments.length-1)) {
        tournamentCtrl.currentFederation = 0;
        tournamentCtrl.currentTournament = 0;
      } else {
        tournamentCtrl.currentFederation += 1;
        tournamentCtrl.currentTournament = 0;
      }
      // console.log(tournamentCtrl.tournaments);
    }

    /* Functionality to browse through tournaments */
    tournamentCtrl.moveTournamentLeft = function () {
      if (tournamentCtrl.currentTournament == 0) {
        tournamentCtrl.currentTournament = (tournamentCtrl.tournaments[tournamentCtrl.currentFederation].length-1);
      } else {
        tournamentCtrl.currentTournament -= 1;
      }
      // console.log(tournamentCtrl.tournaments[tournamentCtrl.currentFederation][tournamentCtrl.currentTournament].$id);
    }

    tournamentCtrl.moveTournamentRight = function () {
      if (tournamentCtrl.currentTournament == (tournamentCtrl.tournaments[tournamentCtrl.currentFederation].length-1)) {
        tournamentCtrl.currentTournament = 0;
      } else {
        tournamentCtrl.currentTournament += 1;
      }
      // console.log(tournamentCtrl.tournaments[tournamentCtrl.currentFederation][tournamentCtrl.currentTournament].$id);
    }

  }
})();
