import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, Platform } from 'react-native';

export default class ClockComponent extends Component {

  constructor() {
    super();

    this.state = { currentTime: null, currentDay: null }
    this.daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  }

  componentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour == 0) {
      hour = 12;
    }

    if (new Date().getHours() < 12) {
      am_pm = 'am';
    }

    this.setState({ currentTime: hour + ' : ' + minutes });

    this.daysArray.map((item, key) => {
      if (key == new Date().getDay()) {
        this.setState({ currentDay: item.toUpperCase() });
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  render() {

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.daysText}>{this.state.currentDay}</Text>
          <Text style={styles.timeText}>{this.state.currentTime}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
        backgroundColor: "#00000015",
      flex: 1,
      paddingTop: 35,
      padding:20,
    },
    headerText: {
      fontSize: 30,
      textAlign: "center",
      margin: 10,
      color: 'black',
      fontWeight: "bold",
    },
    timeText: {
      fontSize: 35,
      color: 'white',
      padding:10
    },
    daysText: {
      color: 'white',
      fontSize: 18,
      paddingBottom: 0,
      padding:10
    }
  });