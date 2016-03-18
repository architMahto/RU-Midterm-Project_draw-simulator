;(function() {
  'use strict';

  angular.module('tournamentControllers', [])
    .controller('tournamentController', tournamentController)

  // Controller Callback
  function tournamentController($http) {
    var tournamentCtrl = this;
    tournamentCtrl.tournaments = [];

    $http.get("../json/tournaments.json").then(gotTournaments);

    function gotTournaments(response) {
      response.data.tournaments.forEach(function (element) {
        tournamentCtrl.tournaments.push(new Tournament(element[0], element[1]));
      });
      console.log(tournamentCtrl.tournaments);
    }

    function Tournament(name, imageURL) {
      this.name = name;
      this.imageURL = imageURL;
    }
  }
})();
