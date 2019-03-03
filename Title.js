import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import UsernameInput from './components/UsernameInput'

export default class Title extends Component {

    constructor(props) {
      super(props);
    }

  render() {
    return (
      <ImageBackground source={require('./assets/titlebackground.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.textContainer}>The App</Text>
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
    fontFamily: 'GoodTimes'
  },
});
