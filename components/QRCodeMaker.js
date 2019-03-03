import React, { Component } from 'react'
import {AppRegistry, StyleSheet, View, TextInput} from 'react-native';
import QRCode from 'react-native-qrcode-svg'

export default class QRCodeMaker extends Component {
  // state = {
  //   text: 'default',
  // };

  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.props.yourId}
          size={128}
          backgroundColor='#ECDDFE'
          color='#746165'/>
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
