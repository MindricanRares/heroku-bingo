import React, { Component } from "react";
import "./App.css";
import BingoCard from "./components/bingo-card";
import ScoreTracker from "./components/score-tracker";

class App extends Component {
  createGameBoard = () => {
    let answers = [
      "Test_1",
      "Test_2",
      "Test_3",
      "Test_4",
      "Test_5",
      "Test_6",
      "Test_7",
      "Test_8",
      "Test_9",
      "Test10",
      "Test11",
      "Test12",
      "Test13",
      "Test14",
      "Test15",
      "Test16",
      "Test17",
      "Test18",
      "Test19",
      "Test20",
      "Test21",
      "Test22",
      "Test23",
      "Test24",
      "Test25"
    ];
    let retvalue = answers.map(answer => {
      return (
        <div key={answer} className="btn btn-default">
          <BingoCard
            totalScore={this.state.totalScore}
            addToScore={this.addToScore}
            removeFromScore={this.removeFromScore}
          />
        </div>
      );
    });
    return retvalue;
  };

  constructor() {
    super();
    this.state = {
      totalScore: 0
    };
  }

  addToScore = () => {
    this.setState(prevState => ({
      totalScore: prevState.totalScore + 100
    }));
  };

  removeFromScore = () => {
    this.setState(prevState => ({
      totalScore: prevState.totalScore - 100
    }));
  };

  render() {
    return (
      <div className="App">
        <ScoreTracker totalScore={this.state.totalScore} />
        <div className="btn-group btn-matrix">{this.createGameBoard()}</div>
      </div>
    );
  }
}
export default App;
