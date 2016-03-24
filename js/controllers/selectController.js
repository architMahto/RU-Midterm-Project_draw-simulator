;(function() {
  'use strict';

  angular.module('selectControllers', [])
    .controller('selectController', selectController)

  // Controller Callback
  function selectController($http, $stateParams) {
    var selectCtrl = this;

    // require request and cheerio
    // var request = require('request');
    // var cheerio = require('cheerio');

    // list of countries variable
    selectCtrl.countries = [];
    // status variables for tournament type
    selectCtrl.international = true;
    selectCtrl.club = true;
    // status variable to show flags or club crests
    selectCtrl.showFlag = true;
    selectCtrl.showCrest = true;
    // traversal variables for selection traversal
    selectCtrl.currentCountry = 0;
    selectCtrl.currentClub = 0;
    // list of teams in tournament
    selectCtrl.tournamentTeams = [];
    // status vaariable to display remove button
    selectCtrl.removeButton = true;

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

      // set host country for European Championships
      for (var i = 0; i < selectCtrl.countries.length; i++) {
        if (selectCtrl.countries[i].name == 'France' && selectCtrl.international && !selectCtrl.club) {
          selectCtrl.tournamentTeams.push(selectCtrl.countries[i]);
          break;
        }
      }

    }

    // Country constructor function
    function Country(name, imageURL) {
      this.name = name;
      this.imageURL = imageURL;
      this.clubs = [];
      this.host = false;
    }

    // Club constructor function
    function Club(name, city, country) {
      this.name = name;
      this.city = city;
      this.country = country;
    }

    /* Make calls to web scrape coefficient and rankings API */
    // request('http://kassiesa.home.xs4all.nl/bert/uefa/data/method4/crank2016.html', function(error, response, html) {
    //   if (!error && response.statusCode == 200) {
    //
    //     var $ = cheerio.load(html);
    //
    //     $("table.t1 td:nth-child(8)").each(function(index,element) {
    //       console.log($(this).text());
    //     });
    //   }
    // });

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

    selectCtrl.addTeamToTournament = function (country, club) {

       if (!selectCtrl.club && selectCtrl.international && !teamInTournament(country, selectCtrl.tournamentTeams)) {
         selectCtrl.tournamentTeams.push(country);
       } else if (selectCtrl.club && selectCtrl.international && !teamInTournament(club, selectCtrl.tournamentTeams)){
         selectCtrl.tournamentTeams.push(club);
       }
    }

    /* Functionality to remove teams from tournament */

    selectCtrl.showRemoveButton = function () {
      selectCtrl.removeButton = !selectCtrl.removeButton;
    }

    selectCtrl.removeTeam = function (index) {
      if (selectCtrl.tournamentTeams[index].host == true) {
        console.log("Cannot remove host team!");
      }

      selectCtrl.tournamentTeams.splice(index,1);
    }

  }
})();
