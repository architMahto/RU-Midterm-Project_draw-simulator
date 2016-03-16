angular.module('drawApp', []);

angular.module('drawApp', [])
  .controller('drawController', ['$scope', function($scope) {
    $scope.countries = ['Spain', 'Germany', 'England', 'Italy', 'France'];
  }])
