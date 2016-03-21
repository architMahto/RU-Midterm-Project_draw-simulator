;(function() {
  'use strict';

  angular.module('drawControllers', [])
    .controller('drawController', drawController)

  // Controller Callback
  function drawController($http) {
    var drawCtrl = this;
    drawCtrl.countries = [];

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
