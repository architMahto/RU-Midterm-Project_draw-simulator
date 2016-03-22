;(function() {
  'use strict';

  angular.module('selectControllers', [])
    .controller('selectController', selectController)

  // Controller Callback
  function selectController($http) {
    var selectCtrl = this;
    selectCtrl.countries = [];
    // status variables for tournament type
    selectCtrl.international = true;
    selectCtrl.club = false;
    // traversal variables for selection traversal
    selectCtrl.currentCountry = 0;
    selectCtrl.currentClub = 0;
    // list of teams in tournament
    selectCtrl.tournamentTeams = [];
    // variables to obtain country name and club name
    // selectCtrl.countryName = "";
    // selectCtrl.clubName = "";

    /* Make call to consume countries.json API*/
    $http.get("../json/countries.json").then(getCountries);

    function getCountries(response) {

      // push list of countries to selectCtrl.countries
      response.data.countries.forEach(function(element) {
        selectCtrl.countries.push(new Country(element[0], element[1]));
      });

      // push list of clubs to assigned country
      for (var i = 0; i < response.data.clubs.length; i++) {
        response.data.clubs[i].forEach(function(element) {
          selectCtrl.countries[i].clubs.push(new Club(element[0], element[1], selectCtrl.countries[i].name));
        });
      }

      // console.log(selectCtrl.countries);
    }

    // Country constructor function
    function Country(name, imageURL) {
      this.name = name;
      this.imageURL = imageURL;
      this.clubs = [];
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
    selectCtrl.addTeamToTournament = function (country, club) {
       console.log(country);
       console.log(club);
    }
  }
})();
