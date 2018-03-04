import React, { Component } from "react";

class ScoreScreen extends Component {
  createScoreBoard = () => {
    let results = this.props.scoreResults.map(score => {
      return <li className='list-group-item score-result-item'>{score}</li>;
    });
    return results;
  };
  render() {
    return (
      <div score-result-item>
        <h1>Results</h1>
        <ul className='list-group score-result-item'>{this.createScoreBoard()}</ul>
      </div>
    );
  }
}

export default ScoreScreen;
