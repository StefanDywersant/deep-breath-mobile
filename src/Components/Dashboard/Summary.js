import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import i18n from '../../Translations';
import AQIIndicator from '../AQIIndicator';

/**
 *  Translate function
 * @type {function}
 */
const t = i18n.t.bind(i18n);

/**
 * Score to description map
 * @type {object.<number, string>}
 */
const description = {
	1: 'Very good',
	2: 'Good',
	3: 'Moderate',
	4: 'Sufficient',
	5: 'Bad',
	6: 'Very bad'
};

const Summary = ({ index }) => {
	if (!description.hasOwnProperty(index.score))
		throw new Error(`Invalid score value: ${index.score}`);

	// calculate indicator progress
	const progress = (10 - index.value) / 10;

	return (
		<View style={styles.general}>
			<AQIIndicator
				style={styles.indicator}
				score={index.score}
				progress={progress}
				thickness={15}
			/>
			<Text style={styles.score}>
				{+(index.value).toFixed(1)}
				<Text style={styles.scoreSmall}> / 10</Text>
			</Text>
			<View style={styles.right}>
				<Text style={styles.label}>{t('Air quality').toUpperCase()}</Text>
				<Text style={styles.description}>{t(description[index.score])}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	general: {
		width: 280,
		marginBottom: 28,
		position: 'relative',
		flexDirection: 'row'
	},
	indicator: {
		height: 80,
		width: 80,
		flex: 0
	},
	score: {
		fontFamily: 'Open Sans',
		fontSize: 12,
		color: '#fff',
		position: 'absolute',
		top: 32,
		left: 0,
		width: 80,
		textAlign: 'center'
	},
	scoreSmall: {
		fontFamily: 'Open Sans',
		fontSize: 9
	},
	right: {
		flex: 1,
		paddingVertical: 10
	},
	label: {
		fontFamily: 'Open Sans',
		fontSize: 11,
		color: 'rgba(255,255,255,0.7)',
		marginLeft: 11
	},
	description: {
		fontFamily: 'Open Sans',
		fontSize: 30,
		fontWeight: '300',
		color: '#fff',
		lineHeight: 34,
		marginLeft: 8
	}
});

Summary.propTypes = {
	/**
	 * Air Quality index
	 */
	index: PropTypes.shape({
		score: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired
	}).isRequired
};

export default Summary;
