/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import StationsStore from './src/Store/stations';
import PositionService from './src/Service/position';
import Dashboard from './src/Components/Dashboard/Dashboard';


export default class DeepBreathMobile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			stations: []
		};
	}

	componentDidMount() {
		PositionService.current()
			.then(position => StationsStore.nearest({position: position.coords, useful: true}))
			.then(stations => this.setState({stations}))
			.catch(error => console.log(error.stack));
	}

	render() {
		return <Dashboard stations={this.state.stations} />;
	}
}

AppRegistry.registerComponent('DeepBreathMobile', () => DeepBreathMobile);
