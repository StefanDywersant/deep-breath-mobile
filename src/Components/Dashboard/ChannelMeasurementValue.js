import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { sprintf } from 'sprintf-js';

const ChannelMeasurementValue = ({ value, format, code }) => {
	format = format.replace('%%', '%');

	if (['temp', 'wd'].indexOf(code) === -1) {
		let [left, right] = format.split(' ');

		return (
			<Text style={styles.general}>
				<Text>{sprintf(left, value) + ' '}</Text>
				<Text style={styles.small}>{right}</Text>
			</Text>
		);
	} else {
		return (
			<Text style={styles.general}>
				<Text>{sprintf(format, value)}</Text>
			</Text>
		);
	}
};

const styles = StyleSheet.create({
	general: {
		flex: 0,
		width: 95,
		color: '#fff',
		textAlign: 'right',
		fontFamily: 'Open Sans',
		fontSize: 14,
		lineHeight: 24
	},
	small: {
		fontFamily: 'Open Sans',
		fontSize: 10
	}
});

ChannelMeasurementValue.propTypes = {
	value: PropTypes.number.isRequired,
	format: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired
};

export default ChannelMeasurementValue;
