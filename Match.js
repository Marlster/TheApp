import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import Tracker from './Tracker';

export default class Match extends Component {

  state = {
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
        id: this.props.userId,// need to get username
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'          }
    }
    let matchedUsername = await fetch("http://lyrane:5000/find_match", data);
    if (matchedUsername._bodyText != "{}") {
      console.log(matchedUsername); // logs json for person
      await this.setState({matchedUsername: matchedUsername._bodyText.username});
      await this.setState({matchedLocation: matchedUsername._bodyText.location});
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
