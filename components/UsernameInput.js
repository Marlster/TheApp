import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button, Alert, ImageBackground } from 'react-native';

export default class UsernameInput extends Component {
  state = {
    text: ''
  }

  constructor(props) {
    super(props);
  }

  onPress = () => {
    // Alert.alert('ready?');
    this.props.setUsername(this.state.text);
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, fontFamily: 'GoodTimes',}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Enter Username'
          maxLength={20}
        />
        <Button
          onPress={this.onPress}
          title="Go"
          accessibilityLabel="Go"
        />
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
});
