;(function() {
  'use strict';

  angular.module('drawControllers', [])
    .controller('drawController', drawController)

  // Controller Callback
  function drawController() {
    var drawCtrl = this;

    drawCtrl.countries = [];
  }
})();
