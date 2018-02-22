import React, { Component } from "react";

class ScoreTracker extends Component {
  render() {
    return <div>The total score is :{this.props.totalScore}</div>;
  }
}

export default ScoreTracker;
