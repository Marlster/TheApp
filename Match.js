import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Button, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import Tracker from './Tracker';
import QRCodeMaker from './components/QRCodeMaker';
import Scanner from './components/Scanner';

export default class Match extends Component {

  state = {
    matchedId: '',
    matchedUsername: '',
    matching: true,
    matchedLocation: null,
    scannerOn: false,
    distance: 0,
    location: null,
    errorMessage: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getMatch();
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

  getDistance = async () => {
    await this._getLocationAsync();
    console.log(this.state.location);
    console.log(this.state.matchedLocation);
    console.log(this.state.matchedUsername);
    let yourLat = this.state.location.coords.latitude;
    let yourLong = this.state.location.coords.longitude;
    let theirLat = this.state.matchedLocation.coords.latitude;
    let theirLong = this.state.matchedLocation.coords.longitude;
    let distance = this.measure(yourLat, yourLong, theirLat, theirLong);
    console.log(distance);
    await this.setState({distance: distance});
  }

  getMatch = async () => {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        id: this.props.userId,
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'          }
    }
    let response = await fetch("http://lyrane:5000/find_match", data);
    if (response._bodyText != "{}") {
      let matchedUsername = JSON.parse(response._bodyText);
      console.log(matchedUsername);
      await this.setState({matchedUsername: matchedUsername.username});
      await this.setState({matchedLocation: matchedUsername.location});
      await this.setState({matchedId: matchedUsername._id.$oid});
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          id: this.state.matchedId,
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'          }
      }
      await fetch("http://lyrane:5000/done", data);
      await this.getDistance();
      await this.setState({matching: false});
    } else {
      console.log('No matches found yet :(');
      setTimeout(() => {this.getMatch()}, 5000); // waits 5 seconds
      // this.props.setPhase(1, '');
    }
  }

  onPress = () => {
    this.setState({scannerOn: true});
  }

  render() {
    if (this.state.matching) {
      return (
        <ImageBackground source={require('./assets/ganda.png')} style={styles.backgroundStyle}>
          <View style={styles.container}>
            <Text style={styles.textContainer2}>Matching. Please Wait.</Text>
          </View>
        </ImageBackground>
      );
    } else if (this.state.scannerOn) {
      return (
        <Scanner theirId={this.state.matchedId} setPhase={this.props.setPhase}/>
      );
    } else {
      return (
        <ImageBackground source={require('./assets/chungusss.jpg')} style={styles.backgroundStyle}>
          <View style={styles.container}>
            <Tracker distance={this.state.distance} theirUsername={this.state.matchedUsername}/>
            <QRCodeMaker yourId={this.props.userId}/>
            <Button
              onPress={this.onPress}
              title="Scan"
              accessibilityLabel="Scan"
            />
          </View>
          </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    fontFamily: 'GoodTimes'
  },
  textContainer2: {
    fontFamily: 'GoodTimes',
    color: 'white'
  },
  backgroundStyle: {
    width: '100%',
    height: '100%'
  },
});
