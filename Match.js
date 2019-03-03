import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';

export default class Match extends Component {

  state = {
    matchedUsername: ''
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getMatch();
  }

  getMatch = async () => {
    console.log(this.props.userId);
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
    if (matchedUsername) {
      this.setState({matchedUsername: matchedUsername});
    } else {
      console.log('No matches found :(');
    }
  }


  render() {
    return (
      <ImageBackground source={require('./assets/titlebackground.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.textContainer}>The App</Text>
        </View>
      </ImageBackground>
    );
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
});
