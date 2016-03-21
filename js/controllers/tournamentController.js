;(function() {
  'use strict';

  angular.module('tournamentControllers', [])
    .controller('tournamentController', tournamentController)

  // Controller Callback
  function tournamentController($http) {
    var tournamentCtrl = this;

    tournamentCtrl.tournaments = [
      [
        {
          name: "UEFA European Championship",
          federation: "UEFA",
          imageURL: "../../img/uefaEuro2016.png",
          category: "national"
        },
        {
          name: "UEFA Champions League",
          federation: "UEFA",
          imageURL: "../../img/uefaChampionsLeague2.png",
          category: "club"
        },
        {
          name: "UEFA Europa League",
          federation: "UEFA",
          imageURL: "../../img/uefaEuropaLeague.png",
          category: "club"
        }
      ],
      [
        {
          name: "FIFA World Cup",
          federation: "International",
          imageURL: "../../img/fifaWorldCup2018.png",
          category: "national"
        }
      ]
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
    }

    tournamentCtrl.moveFederationRight = function () {
      if (tournamentCtrl.currentFederation == (tournamentCtrl.tournaments.length-1)) {
        tournamentCtrl.currentFederation = 0;
        tournamentCtrl.currentTournament = 0;
      } else {
        tournamentCtrl.currentFederation += 1;
        tournamentCtrl.currentTournament = 0;
      }
    }

    /* Functionality to browse through tournaments */
    tournamentCtrl.moveTournamentLeft = function () {
      if (tournamentCtrl.currentTournament == 0) {
        tournamentCtrl.currentTournament = (tournamentCtrl.tournaments[tournamentCtrl.currentFederation].length-1);
      } else {
        tournamentCtrl.currentTournament -= 1;
      }
    }

    tournamentCtrl.moveTournamentRight = function () {
      if (tournamentCtrl.currentTournament == (tournamentCtrl.tournaments[tournamentCtrl.currentFederation].length-1)) {
        tournamentCtrl.currentTournament = 0;
      } else {
        tournamentCtrl.currentTournament += 1;
      }
    }

    // var url1 = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=UEFA_coefficient&rvprop=timestamp|user|comment|content";
    // var url2 = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=UEFA_coefficient&rvprop=content";
    //
    // $http.get("http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=UEFA_coefficient&rvprop=timestamp|user|comment|content").then(successFunction);
    //
    // function successFunction(response) {
    //   console.log(response.data);
    // }
  }
})();
