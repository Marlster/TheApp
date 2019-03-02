import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import UsernameInput from './components/UsernameInput'

export default class Title extends Component {

    constructor(props) {
      super(props);
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>  The App </Text>
        <UsernameInput setUsername={this.props.setUsername}/>
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
});
