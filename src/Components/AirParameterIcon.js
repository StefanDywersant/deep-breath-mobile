import React from 'react';
import { View, StyleSheet } from 'react-native';

const AirParameterIcon = ({ score }) => <View style={StyleSheet.flatten([styles.dot, styles[`score_${score}`]])}/>;

const styles = StyleSheet.create({
	dot: {
		width: 18,
		height: 18,
		borderRadius: 9,
		borderWidth: 1
	},
	score_1: {
		backgroundColor: '#00ff00',
		borderColor: '#00b300'
	},
	score_2: {
		backgroundColor: '#a6ff00',
		borderColor: '#74b300'
	},
	score_3: {
		backgroundColor: '#e6ff00',
		borderColor: '#a1b300'
	},
	score_4: {
		backgroundColor: '#ffc800',
		borderColor: '#b38c00'
	},
	score_5: {
		backgroundColor: '#e25a00',
		borderColor: '#963c00'
	},
	score_6: {
		backgroundColor: '#8b0000',
		borderColor: '#3f0000'
	}
});

AirParameterIcon.propTypes = {
	score: React.PropTypes.number.isRequired
};

export default AirParameterIcon;
