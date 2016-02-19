angular.module('app.controllers', [])

.controller('app_control', function($scope) {
  $scope.title = 'Noodle';
})

.controller('state0_control', function($scope) {
  $scope.items = ["B", "List", "Of", "Items"];
})

.controller('state1_control', function($scope) {
  $scope.items = ["this", "is", "a", "different", "view"];
})