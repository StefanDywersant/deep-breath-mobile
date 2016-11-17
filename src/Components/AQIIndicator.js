import React from 'react';
import { requireNativeComponent } from 'react-native';

class AQIIndicator extends React.Component {
	render() {
		return <NativeAQIIndicator {...this.props}/>;
	}
}

AQIIndicator.propTypes = {
	progress: React.PropTypes.number.isRequired,
	score: React.PropTypes.number.isRequired,
	thickness: React.PropTypes.number
};

var NativeAQIIndicator = requireNativeComponent('AQIIndicatorView', AQIIndicator);

export default AQIIndicator;
