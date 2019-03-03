import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import Tracker from './Tracker';
import QRCodeMaker from './components/QRCodeMaker';
import Scanner from './components/Scanner';

export default class Match extends Component {

  state = {
    matchedId: '',
    matchedUsername: '',
    matching: true,
    matchedLocation: null,
    scannerOn: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getMatch();
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
      this.setState({matching: false});
    } else {
      console.log('No matches found yet :(');
      setTimeout(() => {this.getMatch()}, 5000); // waits 5 seconds
      // this.props.setPhase(1, '');
    }
  }

  onPress = () => {
    let currentState = this.state.scannerOn;
    this.setState({scannerOn: !currentState});
  }

  render() {
    if (this.state.matching) {
      return (
        <ImageBackground source={require('./assets/ganda.png')} style={styles.backgroundStyle}>
          <View style={styles.container}>
            <Text style={styles.textContainer}>Matching.~{"\n"} Please Wait.</Text>
          </View>
        </ImageBackground>
      );
    } else if (this.state.scannerOn) {
      return (
        // <View style={styles.buttonStyle}>
          <Scanner theirId={this.state.matchedId} theirUsername={this.state.matchedUsername} theirsetPhase={this.props.setPhase}/>
          /*{ <Button
            onPress={this.onPress}
            title="Scan QR Code"
            accessibilityLabel="Scan QR Code"
          /> }*/
        // </View>
      );
    } else {
      return (
        <ImageBackground source={require('./assets/chungusss.jpg')} style={styles.backgroundStyle}>
          <View style={styles.container}>

            <Tracker theirLocation={this.state.matchedLocation} theirUsername={this.state.matchedUsername}/>
            <QRCodeMaker yourId={this.props.userId}/>
            <Button
              onPress={this.onPress}
              title="Scan QR Code"
              accessibilityLabel="Scan QR Code"
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
    fontFamily: 'GoodTimes',
    color: 'white',
    fontSize: 20
  },
  buttonStyle: {
    margin: 20
  },
  backgroundStyle: {
    width: '100%',
    height: '100%'
  },
});
