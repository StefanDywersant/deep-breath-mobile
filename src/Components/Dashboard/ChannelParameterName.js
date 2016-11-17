import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import i18n from '../../Translations';
import parameterName from '../../Store/parameterName';

/**
 *  Translate function
 * @type {function}
 */
const t = i18n.t.bind(i18n);

const ChannelParameterName = ({ code }) => {
	return <Text style={styles.general}>{t(parameterName(code))}</Text>;
};

const styles = StyleSheet.create({
	general: {
		flex: 1,
		color: 'rgba(255, 255, 255, 0.7)',
		fontStyle: 'italic',
		fontFamily: 'Open Sans',
		fontSize: 12,
		lineHeight: 24
	}
});

ChannelParameterName.propTypes = {
	/**
	 * Parameter code
	 */
	code: PropTypes.string.isRequired
};

export default ChannelParameterName;
