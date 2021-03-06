import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, AsyncStorage } from 'react-native';
import { Asset, Font } from 'expo';
import Question from './Question';
import Title from './Title';
import Match from './Match';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends Component {
  state = {
    ready: false,
    phase: 1,
    userId: '',
    username: '',
  };

  constructor(props) {
    super(props);
    //this.setUsername = this.setUsername.bind(this);
    //this.setPhase = this.setPhase.bind(this);
  }

  componentDidMount() {
    this.loadAssets();
  }


  async loadFonts() {
    await Font.loadAsync({
      GoodTimes: require('./assets/good_times.ttf'),
    });
  }

  async loadImages() {
    const imageAssets = cacheImages([
      require('./assets/icon.png'),
      require('./assets/splash.png'),
      require('./assets/titlebackground.jpg'),
      require('./assets/chungusss.jpg'),
      require('./assets/ganda.png'),
      require('./assets/Questions.jpg'),
    ]);

    await Promise.all([...imageAssets]);
  }

  async loadAssets() {
    await Promise.all([this.loadFonts(), this.loadImages()])
    this.setState({ready: true})
  }

  setUsername = (name) => {
    if (name === '') {
      name = 'Anon';
    }
    this.setState({username: name, phase: 2});
  }

  setPhase = (phase, newId) => {
      this.setState({phase: phase, userId: newId});
  }

  onPress() {
    AsyncStorage.setItem()
    Alert.alert('hi u')
  }

  render() {
    if (this.state.ready) {
      switch(this.state.phase) {
        default:
        case 1:
          return (
            <Title setUsername={this.setUsername}/>
          );
          break;
        case 2:
            return (
              <View style={styles.container}>
                <Question username={this.state.username} setPhase={this.setPhase}/>
              </View>
            );
          break;
        case 3:
          return (
            <Match userId={this.state.userId} setPhase={this.setPhase}/>
            // <View style={styles.container}>
            //   <Text>Submitted</Text>
            // </View>
          );
          break;
      }
    } else {
      return (
        <View style={styles.container}>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
