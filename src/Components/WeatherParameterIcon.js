import React from 'react';
import { StyleSheet } from 'react-native';
import { createIconSet } from 'react-native-vector-icons';

const parameterCodeIconNameMap = {
	temp: 'thermometer',
	humid: 'humidity',
	press: 'barometer',
	rain: 'rain',
	ws: 'strong-wind',
	wd: 'wind'
};

const glyphs = {
	'thermometer': 0xf055,
	'humidity': 0xf07a,
	'barometer': 0xf079,
	'rain': 0xf019,
	'strong-wind': 0xf050,
	'wind': 0xf0b1
};

const WeatherIcon = createIconSet(glyphs, 'Weather Icons');

const WeatherParameterIcon = ({ parameterCode, measurementValue, style }) => {
	const styleList = [style, styles.icon];

	if (parameterCodeIconNameMap.hasOwnProperty(parameterCode) && parameterCode == 'wd') {
		styleList.push({
			transform: [{
				rotate: `${Math.round(measurementValue)}deg`
			}]
		});
	}

	return <WeatherIcon
		name={parameterCodeIconNameMap[parameterCode]}
		style={StyleSheet.flatten(styleList)}
	/>;
};

const styles = StyleSheet.create({
	icon: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 16
	}
});

WeatherParameterIcon.propTypes = {
	parameterCode: React.PropTypes.string.isRequired,
	measurementValue: React.PropTypes.number,
	style: React.PropTypes.any
};

WeatherParameterIcon.defaultProps = {
	style: {}
};

WeatherParameterIcon.hasIcon = function(parameterCode) {
	return parameterCodeIconNameMap.hasOwnProperty(parameterCode);
};

export default WeatherParameterIcon;
