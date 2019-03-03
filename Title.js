import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import UsernameInput from './components/UsernameInput'

export default class Title extends Component {

  state = {
    onlineUsers = 0
  }

  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let data = {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'same-origin',
    }
    let response = await fetch("http://lyrane:5000/find_match", data);
    this.setState({onlineUsers: response});
  }

  render() {
    return (
      <ImageBackground source={require('./assets/titlebackground.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.textContainer}>THE APP</Text>
          <Text style={styles.textContainer2}>There are {this.state.onlineUsers} nerds online.</Text>
          <UsernameInput setUsername={this.props.setUsername}/>
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
    fontFamily: 'GoodTimes',
    fontSize: 50
  },
  textContainer2: {
    fontFamily: 'GoodTimes',
    fontSize: 25
  },
});
