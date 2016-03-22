;(function() {
  'use strict';

  angular.module('selectControllers', [])
    .controller('selectController', selectController)

  // Controller Callback
  function selectController($http) {
    var selectCtrl = this;
    selectCtrl.countries = [];

    $http.get("../json/countries.json").then(getCountries);

    function getCountries(response) {

      response.data.countries.forEach(function(element) {
        selectCtrl.countries.push(new Country(element[0], element[1]));
      });

      for (var i = 0; i < response.data.clubs.length; i++) {
        response.data.clubs[i].forEach(function(element) {
          selectCtrl.countries[i].clubs.push(new Club(element[0], element[1], selectCtrl.countries[i].name));
        });
      }

      console.log(selectCtrl.countries);
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
  }
})();
