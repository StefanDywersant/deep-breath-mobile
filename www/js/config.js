angular.module('deep-breath')
	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl',
				cache: false
			}).state('settings', {
				url: '/settings',
				templateUrl: 'templates/settings.html',
				controller: 'SettingsCtrl',
				cache: false
			}).state('add', {
				url: '/add',
				templateUrl: 'templates/add.html',
				controller: 'AddCtrl'
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');

		if (!ionic.Platform.isIOS())
			$ionicConfigProvider.scrolling.jsScrolling(false);
	});
