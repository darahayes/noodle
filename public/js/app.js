function configure_states($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app.html',
    controller: 'app_control'
  })

  .state('app.state0', {
    url: '/home',
    views: {
      viewContent: {
        templateUrl: 'templates/view0.html',
        controller: 'state0_control'
      }
    }
  })

  .state('app.state1', {
    url: '/home2',
    views: {
      viewContent: {
        templateUrl: 'templates/view1.html',
        controller: 'state1_control'
      }
    }
  })

  $urlRouterProvider.otherwise('/app/home');
}


angular.module('noodle', ['ui.router', 'app.controllers'])
.config(['$stateProvider', '$urlRouterProvider', configure_states])