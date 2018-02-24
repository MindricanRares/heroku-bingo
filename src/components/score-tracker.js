import React, { Component } from "react";

class ScoreTracker extends Component {
  render() {
    return (
      <div className="score-tracker">
        <h3>The total score is :{this.props.totalScore}</h3>
      </div>
    );
  }
}

export default ScoreTracker;
