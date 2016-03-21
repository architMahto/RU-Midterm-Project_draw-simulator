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
      // console.log(response.data);
      console.log(response.data);
      response.data.countries.forEach(function(element) {
        selectCtrl.countries.push(new Country(element[0], element[1]));
      });
      console.log(selectCtrl.countries);
    }

    function Country(name, imageURL) {
      this.name = name;
      this.imageURL = imageURL;
    }
  }
})();
