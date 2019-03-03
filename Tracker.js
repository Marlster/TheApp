import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class Tracker extends Component {

  state = {
    distance: 0,
    location: null,
    errorMessage: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getDistance();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    await this.setState({ location });
  };

  measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
  }

  getDistance() {
    this._getLocationAsync();
    let yourLat = this.state.location.coords.lattitude;
    let theirLat = this.props.theirLocation.location.coords.lattitude;
    let yourLong = this.state.location.coords.longitude;
    let theirLong = this.props.theirLocation.location.coords.longitude;
    let distance = this.measure(yourLat, yourLong, theirLat, theirLong);
    this.setState({distance: distance});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>You are {this.state.distance} metres away from {this.props.theirUsername}!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  textContainer: {
    fontFamily: 'GoodTimes'
  },
});
