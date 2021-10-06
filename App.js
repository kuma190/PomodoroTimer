//ACTUAL APPPPPP
import React from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  count: {
    fontSize: 48
  },
  timeInput: {
    flexDirection: "row"
  }
});

class Counter extends React.Component {
  constructor(props) {
    super(props);
    //console.log('updating counter state')
    //console.log('counter.interval'+this.interval)
    //clearInterval(this.interval)
    //console.log('counter.interval'+this.interval)
    this.state = {
      count: this.props.count,
      origCount: this.props.count
    };
  }

  componentWillUnmount() {
    //console.log('componentwillunmount '+'counter.interval'+this.interval)

    clearInterval(this.interval);
    //console.log('componentwillunmount '+'counter.interval'+this.interval+' '+this.state.count)
  }

  inc = () => {
    console.log("increment!");
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  };
  makeintoTime = (seconds) => {
    const firstDig = Math.floor(seconds / 600);
    const secondDig = Math.floor((seconds % 600) / 60);
    const thirdDig = Math.floor(((seconds % 600) % 60) / 10);
    const fourthDig = Math.floor(((seconds % 600) % 60) % 10);
    const all =
      firstDig.toString() +
      secondDig.toString() +
      ":" +
      thirdDig.toString() +
      fourthDig.toString();
    return all;
  };
  sendData = () => {
    this.props.parentCallback(this.state.count);
  };

  render() {
    //console.log("counter.props.count"+this.props.count)
    //console.log("counter.state.origcount"+this.state.origCount)
    //console.log("counter.state.count"+this.state.count)
    //console.log("present"+ this.props.present)
    if (this.props.count != this.state.origCount && this.state.count != 0) {
      //console.log("CounterRenderSTateUpdate")
      this.setState(() => ({
        count: this.props.count,
        origCount: this.props.count
      }));
      clearInterval(this.interval);
    } else if (this.state.count === 0) {
      console.log("reached zero");
      clearInterval(this.interval);
      this.sendData();
    } else if (this.props.present === "begin") {
      clearInterval(this.interval);
      this.props.present = "nothing";
      this.interval = setInterval(this.inc, 1000);
    } else if (this.props.present === "paused") {
      clearInterval(this.interval);
    } else if (this.props.present === "resume") {
      clearInterval(this.interval);
      this.props.present = "nothing";
      this.interval = setInterval(this.inc, 1000);
    } else if (this.props.present === "end") {
      console.log("counter end");
      clearInterval(this.interval);
    }

    return (
      <Text style={styles.count}>{this.makeintoTime(this.state.count)} </Text>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    console.log("timerstateupdate");
    this.state = {
      startPressed: false,
      resetPressed: false,
      pausePressed: false,
      resumePressed: false,
      count: this.props.count
    };
  }
  componentWillUnmount() {
    console.log("timercomponentwillunmount");
  }
  toggleStart = () =>
    this.setState(() => ({
      startPressed: true,
      resetPressed: false,
      pausePressed: false,
      resumePressed: false
    }));
  toggleReset = () =>
    this.setState(() => ({
      startPressed: true,
      resetPressed: true,
      pausePressed: false,
      resumePressed: false
    }));
  togglePause = () =>
    this.setState(() => ({
      startPressed: true,
      resetPressed: false,
      pausePressed: true,
      resumePressed: false
    }));
  toggleResume = () =>
    this.setState(() => ({
      startPressed: true,
      resetPressed: false,
      pausePressed: false,
      resumePressed: true
    }));

  callbackFunction = (childData) => {
    this.setState({ count: childData });
  };
  sendData = () => {
    console.log("in send data timer");
    this.props.parentCallback(!this.props.work);
  };

  // this was the render() code originally written in lecture
  render() {
    //console.log("at timer render")
    console.log(this.state);
    if (this.props.count != this.state.count && this.state.count != 0) {
      console.log("TimerRenderSTateUpdate");
      this.setState(() => ({
        count: this.props.count
      }));
      this.toggleStart();
    }
    //console.log("Timer"+this.state.count)
    if (this.state.count === 0) {
      this.sendData();
      console.log("check 0");
      //console.log(this.props.count)
      this.toggleStart();
      this.setState({ count: this.props.count });
      return (
        <View style={styles.appContainer}>
          <Button title="start" onPress={this.toggleStart} />
          <Counter
            parentCallback={this.callbackFunction}
            present={"nothing"}
            count={this.props.count}
          />
        </View>
      );
    } else if (
      !this.state.startPressed &&
      !this.state.resetPressed &&
      !this.state.pausePressed &&
      !this.state.resumePressed
    ) {
      return (
        <View style={styles.appContainer}>
          <Button title="start" onPress={this.toggleStart} />
          <Counter
            parentCallback={this.callbackFunction}
            present={"nothing"}
            count={this.state.count}
          />
        </View>
      );
    } else if (
      this.state.startPressed &&
      !this.state.resetPressed &&
      !this.state.pausePressed &&
      !this.state.resumePressed
    ) {
      return (
        <View style={styles.appContainer}>
          <Button title="reset" onPress={this.toggleReset} />
          <Button title="pause" onPress={this.togglePause} />
          <Counter
            parentCallback={this.callbackFunction}
            present={"begin"}
            count={this.state.count}
          />
        </View>
      );
    } else if (
      this.state.startPressed &&
      this.state.resetPressed &&
      !this.state.pausePressed &&
      !this.state.resumePressed
    ) {
      //console.log("afterReset")
      //console.log('reset'+this.state.count)
      return (
        <View style={styles.appContainer}>
          <Button title="start" onPress={this.toggleStart} />
          <Counter
            parentCallback={this.callbackFunction}
            present={"end"}
            count={this.state.count}
          />
        </View>
      );
    } else if (
      this.state.startPressed &&
      !this.state.resetPressed &&
      this.state.pausePressed &&
      !this.state.resumePressed
    ) {
      return (
        <View style={styles.appContainer}>
          <Button title="reset" onPress={this.toggleReset} />
          <Button title="resume" onPress={this.toggleResume} />
          <Counter
            parentCallback={this.callbackFunction}
            present={"paused"}
            count={this.state.count}
          />
        </View>
      );
    } else if (
      this.state.startPressed &&
      !this.state.resetPressed &&
      !this.state.pausePressed &&
      this.state.resumePressed
    ) {
      return (
        <View style={styles.appContainer}>
          <Button title="reset" onPress={this.toggleReset} />
          <Button title="pause" onPress={this.togglePause} />
          <Counter
            parentCallback={this.callbackFunction}
            present={"resume"}
            count={this.state.count}
          />
        </View>
      );
    }
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("appstate");
    this.state = {
      work: true,
      workSeconds: 1500,
      breakSeconds: 300
    };
  }

  callbackFunction = (childData) => {
    this.setState({ work: childData });
  };
  updateMinChange(newMins, type) {
    var prevSeconds;
    if (type == "work") {
      prevSeconds = this.state.workSeconds;
    } else {
      prevSeconds = this.state.breakSeconds;
    }
    const oldSeconds = prevSeconds % 60;
    if (oldSeconds == 0 && newMins == 0) {
      return 1;
    }
    const newTotal = oldSeconds + 60 * newMins;
    return newTotal;
  }
  updateSecChange(newSecs, type) {
    var prevSeconds;
    if (type == "work") {
      prevSeconds = this.state.workSeconds;
    } else {
      prevSeconds = this.state.breakSeconds;
    }
    const oldMinutes = (prevSeconds - (prevSeconds % 60)) / 60;
    if (oldMinutes == 0 && newSecs == 0) {
      return 1;
    }
    const newTotal = 1 * newSecs + 60 * oldMinutes;
    return newTotal;
  }
  render() {
    console.log(this.state);
    var text = "";
    var propsCount = 0;
    var updateTime;
    if (this.state.work === true) {
      console.log("app" + this.state.workSeconds);
      text = "Work Timer";
      propsCount = this.state.workSeconds;
      updateTime = true;
    } else {
      text = "Break Timer";
      propsCount = this.state.breakSeconds;
      updateTime = false;
    }
    return (
      <View style={styles.appContainer}>
        <Text style={{ fontSize: 48 }}>{text}</Text>
        <Timer
          parentCallback={this.callbackFunction}
          count={propsCount}
          work={this.state.work}
        />
        <View style={styles.appContainer}>
          WorkMins
          <TextInput
            onChangeText={(numbers) => {
              this.setState({
                work: updateTime,
                workSeconds: this.updateMinChange(numbers, "work"),
                breakSeconds: this.state.breakSeconds
              });
            }}
          />
          WorkSecs
          <TextInput
            onChangeText={(numbers) => {
              this.setState({
                work: updateTime,
                workSeconds: this.updateSecChange(numbers, "work"),
                breakSeconds: this.state.breakSeconds
              });
            }}
          />
          BreakMins
          <TextInput
            onChangeText={(numbers) => {
              this.setState({
                work: updateTime,
                workSeconds: this.state.workSeconds,
                breakSeconds: this.updateMinChange(numbers, "break")
              });
            }}
          />
          BreakSecs
          <TextInput
            onChangeText={(numbers) => {
              this.setState({
                work: updateTime,
                workSeconds: this.state.workSeconds,
                breakSeconds: this.updateSecChange(numbers, "break")
              });
            }}
          />
        </View>
      </View>
    );
  }
}
