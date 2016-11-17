export default (apiMeasurement) => {
	return {
		begin: new Date(apiMeasurement.begin),
		end: new Date(apiMeasurement.end),
		value: apiMeasurement.value
	};
};
