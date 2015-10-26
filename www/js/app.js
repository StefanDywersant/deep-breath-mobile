// Ionic Starter App

angular.module('deep-breath', ['ionic', 'ngCordova', 'sprintf', 'dbStationPager'])
	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}

			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});
