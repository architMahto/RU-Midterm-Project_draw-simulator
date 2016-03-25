;(function() {
  'use strict';

  angular.module('selectController', [])
    .controller('selectController', selectController)

  // Controller Callback
  function selectController($http, $stateParams, $firebaseObject, $firebaseArray) {
    var selectCtrl = this;

    // set calls to Firebase databases
    var ref = new Firebase('https://draw-simulator.firebaseio.com/tournaments/' + $stateParams.id);
    var teamsRef = new Firebase('https://draw-simulator.firebaseio.com/teams');

    // tournament variable to store $stateParams from tournamentSelector.html
    selectCtrl.tournament = $firebaseObject(ref);
    // list of countries variable
    selectCtrl.countries = [];
    // status variables for tournament type
    selectCtrl.international = true;
    // traversal variables for selection traversal
    selectCtrl.currentCountry = 0;
    selectCtrl.currentClub = 0;
    // list of teams in tournament
    selectCtrl.tournamentTeams = [];
    // json array to store tournamentTeams
    selectCtrl.tournamentTeamsDatabase = $firebaseArray(teamsRef);

    /* Make call to consume countries.json API*/
    $http.get("../json/countries.json").then(getCountries);

    function getCountries(response) {

      console.log(selectCtrl.tournament);

      teamsRef.remove();

      // push list of countries to selectCtrl.countries
      response.data.countries.forEach(function(element) {
        selectCtrl.countries.push(new Country(element[0], element[1], element[2]));
      });

      // push list of clubs to assigned country
      for (var i = 0; i < response.data.clubs.length; i++) {
        response.data.clubs[i].forEach(function(element) {
          selectCtrl.countries[i].clubs.push(new Club(element[0], element[1], selectCtrl.countries[i].name));
        });
      }

      // set host country for European Championships
      for (var i = 0; i < selectCtrl.countries.length; i++) {
        if (selectCtrl.countries[i].name == 'France' && !selectCtrl.tournament.club) {
          selectCtrl.countries[i].host = true;
          selectCtrl.countries[i].removeButton = false;
          selectCtrl.tournamentTeams.push(selectCtrl.countries[i]);
          selectCtrl.tournamentTeamsDatabase.$add(selectCtrl.countries[i])
          break;
        }
      }
    }

    // Country constructor function
    function Country(name, imageURL, nationalCoefficient) {
      this.name = name;
      this.imageURL = imageURL;
      this.nationalCoefficient = nationalCoefficient;
      this.clubs = [];
      this.host = false;
      this.removeButton = true;
    }

    // Club constructor function
    function Club(name, city, country) {
      this.name = name;
      this.city = city;
      this.country = country;
    }

    /* Functionality to browse through countries */
    selectCtrl.moveCountryLeft = function () {
      if (selectCtrl.currentCountry == 0) {
        selectCtrl.currentCountry = (selectCtrl.countries.length-1);
        selectCtrl.currentClub = 0;
      } else {
        selectCtrl.currentCountry -= 1;
        selectCtrl.currentClub = 0;
      }
    }

    selectCtrl.moveCountryRight = function () {
      if (selectCtrl.currentCountry == (selectCtrl.countries.length-1)) {
        selectCtrl.currentCountry = 0;
        selectCtrl.currentClub = 0;
      } else {
        selectCtrl.currentCountry += 1;
        selectCtrl.currentClub = 0;
      }
    }

    /* Functionality to browse through clubs */
    selectCtrl.moveClubLeft = function () {
      if (selectCtrl.currentClub == 0) {
        selectCtrl.currentClub = (selectCtrl.countries[selectCtrl.currentCountry].clubs.length-1);
      } else {
        selectCtrl.currentClub -= 1;
      }
    }

    selectCtrl.moveClubRight = function () {
      if (selectCtrl.currentClub == (selectCtrl.countries[selectCtrl.currentCountry].clubs.length-1)) {
        selectCtrl.currentClub = 0;
      } else {
        selectCtrl.currentClub += 1;
      }
    }

    /* Functionality to add teams to tournament */

    // helper function to check if team is in tournament
    var teamInTournament = function(team, tournamentTeams) {
      if (tournamentTeams.length == 0) {
        return false;
      }
      for (var i = 0; i < tournamentTeams.length; i++) {
        if (team.name == tournamentTeams[i].name) {
          return true;
        }
      }
      return false;
    }

    // helper function to check if team is eligible to add to tournament
    var ableToAddTeam = function (team, tournamentTeams, maxTeams) {
      return !teamInTournament(team, tournamentTeams) &&
             tournamentTeams.length < maxTeams;
    }

    // ng-click function to add team to tournament
    selectCtrl.addTeamToTournament = function (country, club) {
      if (!selectCtrl.tournament.club &&
         ableToAddTeam(country, selectCtrl.tournamentTeams, selectCtrl.tournament.maxTeams)) {
        // add country to the DOM
        selectCtrl.tournamentTeams.push(country);
        // add country to the database
        selectCtrl.tournamentTeamsDatabase.$add(country);
      } else if (selectCtrl.tournament.club &&
                ableToAddTeam(club, selectCtrl.tournamentTeams, selectCtrl.tournament.maxTeams)) {
      // add club to the DOM
       selectCtrl.tournamentTeams.push(club);
      //  add club to the database
       selectCtrl.tournamentTeamsDatabase.$add(club);
      }
    }

    /* Functionality to remove teams from tournament */
    selectCtrl.removeTeam = function (team, index) {
      // variable to store url of reference of element to remove
      var removeRef = "";
      // retrieve element to remove from database
      teamsRef.orderByChild("name").equalTo(team.name).on("child_added", function (snapshot) {
        removeRef = new Firebase('https://draw-simulator.firebaseio.com/teams/' + snapshot.key());
      })
      // remove element from the DOM
      selectCtrl.tournamentTeams.splice(selectCtrl.tournamentTeams.indexOf(team),1);
      // remove element from the database
      removeRef.remove();
    }

    /* Functionality to see if we are able to draw*/
  }
})();
