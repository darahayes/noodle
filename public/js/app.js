function configure_states($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('home', {
		url: '/home',
		templateUrl: 'templates/home.html',
		controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
	})

	$urlRouterProvider.otherwise('/home');
}


angular.module('noodle', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', configure_states])