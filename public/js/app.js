function configure_states($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app.html',
    controller: function($scope) {
      $scope.title = 'Noodle'
    }
  })

  .state('app.state0', {
    url: '/home',
    views: {
      viewContent: {
        templateUrl: 'templates/view0.html',
        controller: function($scope) {
          $scope.items = ["B", "List", "Of", "Items"];
        }
      }
    }
  })

  .state('app.state1', {
    url: '/home2',
    views: {
      viewContent: {
        templateUrl: 'templates/view1.html',
        controller: function($scope) {
          $scope.items = ["this", "is", "a", "different", "view"];
        }
      }
    }
  })

  $urlRouterProvider.otherwise('/app/home');
}


angular.module('noodle', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', configure_states])