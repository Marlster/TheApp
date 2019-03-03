import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class Tracker extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>You are {this.props.distance} metres away from {this.props.theirUsername}!</Text>
        <Text style={styles.textContainer}>Now find them! Once you do, scan their QR Code or get them to scan yours:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  textContainer: {
    fontFamily: 'GoodTimes'
  },
});
