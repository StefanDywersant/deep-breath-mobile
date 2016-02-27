angular.module('deep-breath')
	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, uiGmapGoogleMapApiProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/',
				templateUrl: 'templates/dashboard.html',
				controller: 'DashboardCtrl',
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
			}).state('station', {
				url: '/station/:uuid/:showadd',
				templateUrl: 'templates/station.html',
				controller: 'StationCtrl',
				params: {
					showadd: {
						value: '0',
						squash: true
					}
				}
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');

		if (!ionic.Platform.isIOS())
			$ionicConfigProvider.scrolling.jsScrolling(false);

		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyDhF4thEhLE2fAZ2uE91f49Y4UEEPS_5HU',
			libraries: 'weather,geometry,visualization'
		});
	});
