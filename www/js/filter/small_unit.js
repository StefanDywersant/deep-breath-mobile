angular.module('deep-breath')
	.filter('smallUnit', function () {
		return function (format) {
			if (!format)
				return format;

			format = format.split(' ');
			return format[0] + ' <small>' + format[1] + '</small>'
		};
	});