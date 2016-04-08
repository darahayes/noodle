function configure_states($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app.html',
    controller: 'app_control'
  })

  .state('app.events', {
    url: '/home',
    views: {
      viewContent: {
        templateUrl: 'templates/events.html',
        controller: 'events_control'
      }
    }
  })

  .state('app.new_event', {
    url: '/event/new',
    views: {
      viewContent: {
        templateUrl: 'templates/new_event.html',
        controller: 'new_event_control'
      }
    }
  })

  $urlRouterProvider.otherwise('/app/home');
}

function run($window, $rootScope) {
  //so we can always tell when we're online or not
  $rootScope.online = navigator.onLine;
  $window.addEventListener("offline", function () {
    $rootScope.$apply(function() {
      $rootScope.online = false;
    });
  }, false);
  $window.addEventListener("online", function () {
    $rootScope.$apply(function() {
      $rootScope.online = true;
    });
  }, false);
}


angular.module('noodle', ['ui.router', 'app.controllers'])
.config(['$stateProvider', '$urlRouterProvider', configure_states])
.run(run);