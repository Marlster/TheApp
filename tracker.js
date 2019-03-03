import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class Question extends Component {

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
      this._getLocationAsync();
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>You are {this.state.distance} metres away!</Text>
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
