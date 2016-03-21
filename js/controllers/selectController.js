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
      console.log(response);
    }

    function Country(name, clubs) {
      this.name = name;
      this.clubs = clubs;
    }
  }
})();
