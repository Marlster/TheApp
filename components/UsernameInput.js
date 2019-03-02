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
    Alert.alert('ready?');
    this.props.setUsername(this.state.text);
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <ImageBackground source={'https://cdn.iphonephotographyschool.com/wp-content/uploads/iPhone-Photos-Dramatic-Light-16.jpg'} style={{width: '100%', height: '100%'}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder='Enter Username'
          />
          <Button
            onPress={this.onPress}
            title="Go"
            accessibilityLabel="Go"
          />
        </ImageBackground>
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
