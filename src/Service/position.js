const current = function() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(position => resolve(position));
	});
};

export default {current};
