// angular.module('drawApp', []);
//
// angular.module('drawApp', [])
//   .controller('drawController', ['$scope', function($scope) {
//     $scope.countries = ['Albania', 'Andorra', 'Armenia', 'Austria', ''];
//   }])

(function() {
  angular.module('drawApp', ['tournamentControllers', 'drawControllers']);
})();
