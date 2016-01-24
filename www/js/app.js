// Ionic Starter App

angular.module('deep-breath', ['ionic', 'ngCordova', 'sprintf', 'dbStationPager', 'angular-svg-round-progress', 'angularMoment', '$q-spread'])
	.run(function ($ionicPlatform, amMoment) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}

			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});

		amMoment.changeLocale('pl');
	});
