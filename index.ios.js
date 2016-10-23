/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import StationsStore from './src/Store/stations';

export default class DeepBreathMobile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			stations: []
		};
	}

	renderPagination(index, total, context) {
		let dots = [];

		const LocalDotActive = <Icon name="ios-locate-outline" size={10} color="rgba(255, 255, 255, 1)" style={{
				marginLeft: 3,
				marginRight: 3,
				marginTop: 3,
				marginBottom: 3
			}} />;

		const LocalDot = <Icon name="ios-locate-outline" size={10} color="rgba(255, 255, 255, .5)" style={{
				marginLeft: 3,
				marginRight: 3,
				marginTop: 3,
				marginBottom: 3
			}} />;

		const DotActive = <View style={{
				backgroundColor: 'rgba(255, 255, 255, 1)',
				width: 8,
				height: 8,
				borderRadius: 4,
				marginLeft: 3,
				marginRight: 3,
				marginTop: 3,
				marginBottom: 3
			}} />;

		const Dot = <View style={{
				backgroundColor: 'rgba(255, 255, 255, .5)',
				width: 8,
				height: 8,
				borderRadius: 4,
				marginLeft: 3,
				marginRight: 3,
				marginTop: 3,
				marginBottom: 3
			}} />;

		for (let i = 0; i < total; i++) {
			if (i === index) {
				dots.push(i === 0
					? React.cloneElement(LocalDotActive, {key: i})
					: React.cloneElement(DotActive, {key: i}));
			} else {
				dots.push(i === 0
					? React.cloneElement(LocalDot, {key: i})
					: React.cloneElement(Dot, {key: i}));
			}

		}

		return (
			<View pointerEvents='none' style={styles.pagination}>
				{dots}
			</View>
		)
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			StationsStore.nearest({
					position: {
						longitude: position.coords.longitude,
						latitude: position.coords.latitude
					},
					useful: true
				})
				.then((stations) => {
					this.setState({stations});
				});
		}, (error) => console.error(error));
	}

	render() {
		return (
			<View>
				<LinearGradient colors={['rgba(153,204,255,1)', 'rgba(0,114,188,1)']} style={styles.gradient} />
				<View style={styles.footer} />
				<Swiper loop={false} renderPagination={this.renderPagination}>
					{this.state.stations.map((station) => {
						return (
							<View key={station.uuid} style={styles.container}>
								<Text style={styles.welcome}>
									<Icon name="ios-pin" size={14} color="rgba(255, 255, 255, 1)" />
									&nbsp;
									{station.name}
								</Text>
							</View>
						);
					})}
				</Swiper>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	footer: {
		position: 'absolute',
		height: 50,
		backgroundColor: 'rgba(0, 0, 0, .3)',
		bottom: 0,
		left: 0,
		right: 0
	},
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center'
	},
	gradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0

	},
	welcome: {
		fontSize: 14,
		textAlign: 'center',
		margin: 10,
		backgroundColor: 'transparent',
		color: "#fff"
	},
	pagination: {
		position: 'absolute',
		bottom: 18,
		left: 0,
		right: 0,
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
	}
});

AppRegistry.registerComponent('DeepBreathMobile', () => DeepBreathMobile);
