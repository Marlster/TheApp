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
    matchedLocation: null
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
      console.log(matchedUsername); // logs json for person
      await this.setState({matchedUsername: matchedUsername._bodyText.username});
      await this.setState({matchedLocation: matchedUsername._bodyText.location});
      await this.setState({matchedId: matchedUsername._bodyText._id});
      console.log(this.state.matchedUsername);
      console.log(this.state.matchedLocation);
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
      fetch("http://lyrane:5000/done", data);
      this.setState({matching: false});
    } else {
      console.log('No matches found yet :(');
      setTimeout(() => {this.getMatch()}, 5000); // waits 5 seconds
      // this.props.setPhase(1, '');
    }
  }

  render() {
    if (this.state.matching) {
      return (
        <ImageBackground source={require('./assets/titlebackground.jpg')} style={styles.backgroundStyle}>
          <View style={styles.container}>
            <Text style={styles.textContainer}>Matching. Please Wait.</Text>
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground source={require('./assets/titlebackground.jpg')} style={styles.backgroundStyle}>
          <View style={styles.container}>
            <Text style={styles.textContainer}>You have been matched with {this.state.matchedUsername}!</Text>
            <Tracker theirLocation={this.state.matchedLocation} theirUsername={this.state.matchedUsername}/>
            <QRCode yourId={this.props.userId}/>
            <Scanner theirId={this.state.matchedId} setPhase={this.props.setPhase}/>
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
  backgroundStyle: {
    width: '100%',
    height: '100%'
  },
});
