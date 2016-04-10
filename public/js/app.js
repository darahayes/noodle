function configure_states($stateProvider, $urlRouterProvider, $localStorage) {
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

  .state('app.event', {
    url: '/event/:index',
    views: {
      viewContent: {
        templateUrl: 'templates/new_event.html',
        controller: 'new_event_control'
      }
    },
    resolve: {
      event: function($stateParams, $localStorage) {
        console.log('index', $stateParams.index);
        console.log('events', $localStorage.events)
        console.log('event', $localStorage.events[$stateParams.index])
        if ($stateParams.index >= 0 && $stateParams.index < $localStorage.events.length) {
          console.log('selected valid index')
          return $localStorage.events[$stateParams.index];
        }
        else {
          console.log('Invalid Event Selection')
          return null;
        }
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
    Materialize.toast('You are now offline', 4000);
  }, false);
  $window.addEventListener("online", function () {
    $rootScope.$apply(function() {
      $rootScope.online = true;
    });
    Materialize.toast('You are online again', 4000)
  }, false);
}


angular.module('noodle', ['ui.router', 'app.controllers', 'ngStorage', 'app.EventServiceModule'])
.config(['$stateProvider', '$urlRouterProvider', configure_states])
.run(run);