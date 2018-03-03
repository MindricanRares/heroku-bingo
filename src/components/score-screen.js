import React, { Component } from "react";

class ScoreScreen extends Component {
  createScoreBoard = () => {
    debugger;
    let results = this.props.scoreResults.map(score => {
      return <li className="list-group-item">{score}</li>;
    });
    return results;
  };
  render() {
    return (
      <div>
        <h1>Results</h1>
        <ul className="list-group">{this.createScoreBoard()}</ul>
      </div>
    );
  }
}

export default ScoreScreen;
