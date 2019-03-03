import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

class LoopQuestions extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const answerArray = []
    for (let answer of this.props.answers) {
      answerArray.push(
        <Button
          key={answer}
          onPress={this.props.onPressFactory(answer)}
          title={answer}
        />
      );
    }
    return (
      <View style={styles.buttonContainer}>
        {answerArray}
      </View>
    );
  }
}


export default class Question extends Component {

  state = {
    answers: [],
    questions: [],
    currentQueId: 0,
    location: null,
    errorMessage: null
  }

  constructor(props) {
    super(props);
     this.onPressFactory = this.onPressFactory.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    await this.setState({ location });
  };

  onPressFactory (answer) {
    let onPress = async function () {
      // Alert.alert(answer);
      let id = this.state.currentQueId;
      this.setState(prevState => ({
        answers: [...prevState.answers, answer]}));
      await this.setState({currentQueId: this.state.currentQueId + 1});
      if (this.state.currentQueId >= this.state.questions.length) {
        let data = {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify({
            username: this.props.username,// need to get username
            location: this.state.location,
            questionAnswers: this.state.answers
          }),
          headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json'          }
        }
        let response = await fetch("http://lyrane:5000/user", data);
        let newId =  response._bodyText;
        await this.props.setPhase(3, newId);
      }
    }
    onPress = onPress.bind(this);
    return onPress;
  }

  getQuestions = async () => {
    try {
      const response = await fetch("http://lyrane:5000/questions.json");
      const questions = await response.json();
      //console.log(questions);
      this.setState({
        questions: questions
      })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View>
      { this.state.questions.length > 0 && this.state.currentQueId < this.state.questions.length ?
      <View style={styles.container}>
        <View>
          <Text style={styles.textContainer}>{this.state.questions[this.state.currentQueId].question}</Text>
        </View>
        <LoopQuestions onPressFactory={this.onPressFactory} answers={this.state.questions[this.state.currentQueId].answers}/>
      </View>
       :
       null
    }
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
  textContainer: {
    fontFamily: 'GoodTimes'
  },
});
