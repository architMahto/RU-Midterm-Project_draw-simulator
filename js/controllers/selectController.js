;(function() {
  'use strict';

  angular.module('selectControllers', [])
    .controller('selectController', selectController)

  // Controller Callback
  function selectController($http, $stateParams) {
    var selectCtrl = this;

    // tournament variable to store $stateParams from tournamentSelector.html
    selectCtrl.tournament = new Tournament($stateParams);
    // list of countries variable
    selectCtrl.countries = [];
    // status variables for tournament type
    selectCtrl.international = true;
    // status variable to show flags or club crests
    selectCtrl.showFlag = true;
    selectCtrl.showCrest = true;
    // traversal variables for selection traversal
    selectCtrl.currentCountry = 0;
    selectCtrl.currentClub = 0;
    // list of teams in tournament
    selectCtrl.tournamentTeams = [];

    /* Make call to consume countries.json API*/
    $http.get("../json/countries.json").then(getCountries);

    function getCountries(response) {

      // push list of countries to selectCtrl.countries
      response.data.countries.forEach(function(element) {
        selectCtrl.countries.push(new Country(element[0], element[1], element[2]));
        // console.log(selectCtrl.countries);
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
          break;
        }
      }

      console.log(selectCtrl.countries);
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

    // Tournament constructor function
    function Tournament($stateParams) {
      this.name = $stateParams.name;
      if ($stateParams.club == 'false') {
        this.club = false;
      } else {
        this.club = true;
      }
      this.maxTeams = parseInt($stateParams.maxTeams);
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

    // helper function to check if team is eligible to add to tournament
    var ableToAddTeam = function (team, tournamentTeams, maxTeams) {
      // if (!teamInTournament(team, selectCtrl))
      return !teamInTournament(team, tournamentTeams) &&
             tournamentTeams.length < maxTeams;
    }

    selectCtrl.addTeamToTournament = function (country, club) {

       if (!selectCtrl.tournament.club &&
           ableToAddTeam(country, selectCtrl.tournamentTeams, selectCtrl.tournament.maxTeams)) {
        //  country.removeButton = false;
        //  console.log(country);
         selectCtrl.tournamentTeams.push(country);
       } else if (selectCtrl.tournament.club &&
                  ableToAddTeam(club, selectCtrl.tournamentTeams, selectCtrl.tournament.maxTeams)){
        //  club.removeButton = false;
        //  console.log(club);
         selectCtrl.tournamentTeams.push(club);
       }
    }

    /* Functionality to remove teams from tournament */
    selectCtrl.removeTeam = function (index) {
        selectCtrl.tournamentTeams.splice(index,1);
    }

  }
})();
