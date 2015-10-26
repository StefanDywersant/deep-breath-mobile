angular.module('deep-breath')
	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');

		if (!ionic.Platform.isIOS())
			$ionicConfigProvider.scrolling.jsScrolling(false);
	});
