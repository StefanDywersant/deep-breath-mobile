// Ionic Starter App

angular.module('deep-breath', ['ionic', 'ngCordova', 'sprintf', 'angular-svg-round-progress', 'angularMoment', '$q-spread', 'gettext', 'uiGmapgoogle-maps'])
	.run(function ($ionicPlatform, amMoment, $cordovaGlobalization, gettextCatalog) {
		$ionicPlatform.ready(function () {
			if (window.cordova) {
				if (window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				}

				$cordovaGlobalization.getPreferredLanguage().then(function(preferredLanaguage) {
					var lang = preferredLanaguage.value.replace('-', '_');

					console.log('Preferred language: ' + lang);

					gettextCatalog.setCurrentLanguage(lang);
					gettextCatalog.loadRemote("translations/" + lang + ".json");
					amMoment.changeLocale(lang.split('_')[0]);
				});
			} else {
				var lang = 'pl_PL';
				gettextCatalog.setCurrentLanguage(lang);
				gettextCatalog.loadRemote("/translations/" + lang + ".json");
				amMoment.changeLocale(lang.split('_')[0]);
			}

			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});
