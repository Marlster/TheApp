import React, { Component } from 'react'
import {AppRegistry, StyleSheet, View, TextInput} from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QRCodeMaker extends Component {
  // state = {
  //   text: 'default',
  // };

  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.props.yourId}
          size={100}
          bgColor='purple'
          fgColor='white'/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // input: {
    //     height: 40,
    //     borderColor: 'gray',
    //     borderWidth: 1,
    //     margin: 10,
    //     borderRadius: 5,
    //     padding: 5,
    // }
});
