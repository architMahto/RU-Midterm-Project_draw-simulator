;(function() {
  'use strict';

  angular.module('tournamentControllers', [])
    .controller('tournamentController', tournamentController)

  // Controller Callback
  function tournamentController($http) {
    var tournamentCtrl = this;

    // 2D array of tournament objects
    tournamentCtrl.tournaments = [
      [
        {
          name: "UEFA European Championship",
          federation: "UEFA",
          imageURL: "../../img/uefaEuro2016.png",
          club: false,
          maxTeams: 24
        },
        {
          name: "UEFA Champions League",
          federation: "UEFA",
          imageURL: "../../img/uefaChampionsLeague2.png",
          club: true,
          maxTeams: 32
        },
        {
          name: "UEFA Europa League",
          federation: "UEFA",
          imageURL: "../../img/uefaEuropaLeague.png",
          club: true,
          maxTeams: 48
        }
      ]
      // [
      //   {
      //     name: "FIFA World Cup",
      //     federation: "FIFA",
      //     imageURL: "../../img/fifaWorldCup2018.png",
      //     category: "national"
      //   }
      // ]
    ];

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
      console.log(tournamentCtrl.tournaments);
    }

    tournamentCtrl.moveFederationRight = function () {
      if (tournamentCtrl.currentFederation == (tournamentCtrl.tournaments.length-1)) {
        tournamentCtrl.currentFederation = 0;
        tournamentCtrl.currentTournament = 0;
      } else {
        tournamentCtrl.currentFederation += 1;
        tournamentCtrl.currentTournament = 0;
      }
      console.log(tournamentCtrl.tournaments);
    }

    /* Functionality to browse through tournaments */
    tournamentCtrl.moveTournamentLeft = function () {
      if (tournamentCtrl.currentTournament == 0) {
        tournamentCtrl.currentTournament = (tournamentCtrl.tournaments[tournamentCtrl.currentFederation].length-1);
      } else {
        tournamentCtrl.currentTournament -= 1;
      }
      console.log(tournamentCtrl.tournaments);
    }

    tournamentCtrl.moveTournamentRight = function () {
      if (tournamentCtrl.currentTournament == (tournamentCtrl.tournaments[tournamentCtrl.currentFederation].length-1)) {
        tournamentCtrl.currentTournament = 0;
      } else {
        tournamentCtrl.currentTournament += 1;
      }
      console.log(tournamentCtrl.tournaments);
    }


  }
})();
