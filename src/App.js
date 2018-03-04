import React, { Component } from "react";
import "./App.css";
import BingoCard from "./components/bingo-card";
import ScoreTracker from "./components/score-tracker";
import Header from "./components/header";
import { subscribeToResults, submitScore } from "./api";
import ScoreScreen from "./components/score-screen";
import SubmitScore from "./components/submit-score";
import pickAnswers from "./apputils";

class App extends Component {

  constructor() {
    super();
    this.state = {
      totalScore: 0,
      scoreResults: []
    };
    this.answers = pickAnswers();
    this.matrix = [];
    for (let i = 0; i < 5; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < 5; j++) {
        this.matrix[i][j] = 0;
      }
    }
    subscribeToResults((err, scoreResults) =>
      this.setState({
        scoreResults
      })
    );

    this.colorMatrix = [];

    this.addToScore.bind(this);
    this.alreadyHasDiagonalBing = false;
    this.alreadyHasInverterdDiagonalBongp = false;
    this.alreadyHasLineBingo = [false, false, false, false, false];
    this.alreadyHasColumnBingo = [false, false, false, false, false];
    this.bingoCardBackground = "";
  }
  checkIfBingo() {
    for (let k = 0; k <= 5; k++) {
      if (this.alreadyHasLineBingo[k] === false) {
        this.checkForLineBingo(k);
      }
    }

    for (let k = 0; k <= 5; k++) {
      if (this.alreadyHasColumnBingo[k] === false) {
        this.checkForColumnBingo(k);
      }
    }

    if (this.alreadyHasDiagonalBing === false) {
      this.checkForDiagonalBingo();
    }

    if (this.alreadyHasInverterdDiagonalBongp === false) {
      this.checkforInvertedDiagonalBingo();
    }
  }

  checkIfBingoLost() {
    for (let k = 0; k <= 5; k++) {
      if (this.alreadyHasLineBingo[k] === true) {
        this.checkForLineBingoLost(k);
      }
    }
    debugger

    for (let k = 0; k <= 5; k++) {
      if (this.alreadyHasColumnBingo[k] === true) {
        this.checkForColumnBingoLost(k);
      }
    }

    if (this.alreadyHasDiagonalBing === true) {
      this.checkForDiagonalBingoLoss();
    }

    if (this.alreadyHasInverterdDiagonalBongp === true) {
      this.checkforInvertedDiagonalBingoLoss();
    }
  }

  checkForColumnBingo(k) {
    let columnHasBingo = true;
    for (let i = 0; i < 5; i++) {
      if (this.matrix[i][k] === 0) {
        columnHasBingo = false;
      }
    }
    if (columnHasBingo === true) {
      this.setState(prevState => ({
        totalScore: prevState.totalScore + 500
      }));
      console.log(`Bingo on column ${k}`);
      this.alreadyHasColumnBingo[k] = true;
      this.colorBingoColumn(k);
    }
  }
  checkForColumnBingoLost(k) {
    let columnHasBingo = false;
    for (let i = 0; i < 5; i++) {
      if (this.matrix[i][k] === 0) {
        columnHasBingo = true;
      }
    }
    if (columnHasBingo === true) {
      this.setState(prevState => ({
        totalScore: prevState.totalScore - 500
      }));
      console.log(`Bingo lost on column ${k}`);
      this.alreadyHasColumnBingo[k] = true;
      this.colorBingoColumn(k);
    }
  }
  checkForLineBingo(k) {
    let lineHasBingo = true;
    for (let i = 0; i < 5; i++) {
      if (this.matrix[k][i] === 0) {
        lineHasBingo = false;
      }
    }
    if (lineHasBingo === true) {
      console.log(`Bingo on line ${k}`);
      this.setState(prevState => ({
        totalScore: prevState.totalScore + 500
      }));
      this.alreadyHasLineBingo[k] = true;
      this.colorBingoLine(k);
    }
  }

  checkForLineBingoLost(k) {
    let lineHasBingo = false;
    for (let i = 0; i < 5; i++) {
      if (this.matrix[k][i] > 0) {
        lineHasBingo = true;
      }
    }
    if (lineHasBingo === true) {
      console.log(`Bingo lost on line ${k}`);
      this.setState(prevState => ({
        totalScore: prevState.totalScore - 500
      }));
      this.alreadyHasLineBingo[k] = false;
      this.colorBingoLine(k);
    }
  }

  checkforInvertedDiagonalBingo() {
    let invertedDiagonalBingo = true;
    for (let i = 0; i < 5; i++) {
      if (this.matrix[i][4 - i] === 0) {
        invertedDiagonalBingo = false;
      }
    }
    if (invertedDiagonalBingo === true) {
      this.alreadyHasInverterdDiagonalBongp = true;
      this.setState(prevState => ({
        totalScore: prevState.totalScore + 500
      }));
      this.colorInvertedDiagonalBingo();
      console.log("Bingo");
    }
  }
  checkforInvertedDiagonalBingoLoss() {
    let invertedDiagonalBingo = false;
    for (let i = 0; i < 5; i++) {
      if (this.matrix[i][4 - i] === 0) {
        invertedDiagonalBingo = true;
      }
    }
    if (invertedDiagonalBingo === true) {
      this.alreadyHasInverterdDiagonalBongp = false;
      this.setState(prevState => ({
        totalScore: prevState.totalScore - 500
      }));
      this.colorInvertedDiagonalBingo();
      console.log("Bingo");
    }
  }
  checkForDiagonalBingo() {
    let diagonalBingo = true;
    for (let i = 0; i < 5; i++) {
      if (this.matrix[i][i] === 0) {
        diagonalBingo = false;
      }
    }
    if (diagonalBingo === true) {
      this.alreadyHasDiagonalBing = true;
      this.setState(prevState => ({
        totalScore: prevState.totalScore + 500
      }));
      this.colorDiagonalBingo();
      console.log("Bingo");
    }
  }
  checkForDiagonalBingoLoss() {
    let diagonalBingo = false;
    for (let i = 0; i < 5; i++) {
      if (this.matrix[i][i] === 0) {
        diagonalBingo = true;
      }
    }
    if (diagonalBingo === true) {
      this.alreadyHasDiagonalBing = false;
      this.setState(prevState => ({
        totalScore: prevState.totalScore - 500
      }));
      this.colorDiagonalBingo();
      console.log("Bingo");
    }
  }

  colorBingoColumn(k) {
    this.colorMatrix[k] = "bingo-card";
    this.colorMatrix[k + 5] = "bingo-card";
    this.colorMatrix[k + 10] = "bingo-card";
    this.colorMatrix[k + 15] = "bingo-card";
    this.colorMatrix[k + 20] = "bingo-card";
  }

  colorBingoLine(k) {
    this.colorMatrix[5 * k] = "bingo-card";
    this.colorMatrix[5 * k + 1] = "bingo-card";
    this.colorMatrix[5 * k + 2] = "bingo-card";
    this.colorMatrix[5 * k + 3] = "bingo-card";
    this.colorMatrix[5 * k + 4] = "bingo-card";
  }

  colorDiagonalBingo() {
    this.colorMatrix[0] = "bingo-card";
    this.colorMatrix[6] = "bingo-card";
    this.colorMatrix[12] = "bingo-card";
    this.colorMatrix[18] = "bingo-card";
    this.colorMatrix[24] = "bingo-card";
  }

  colorInvertedDiagonalBingo() {
    this.colorMatrix[4] = "bingo-card";
    this.colorMatrix[8] = "bingo-card";
    this.colorMatrix[12] = "bingo-card";
    this.colorMatrix[16] = "bingo-card";
    this.colorMatrix[20] = "bingo-card";
  }


  createGameBoard = () => {
    // debugger;
    this.answers[12] = "Bingo";
    this.matrix[2][2] = 1;
    this.gameBoard = this.answers.map((answer, index) => {
      return (
        <div key={index} className='btn btn-default'>
          <BingoCard
            backGroundColor={this.colorMatrix[index]}
            index={index}
            answer={answer}
            totalScore={this.state.totalScore}
            addToScore={this.addToScore}
            removeFromScore={this.removeFromScore}
          />
        </div>
      );
    });
    return this.gameBoard;
  };

  addToScore = index => {
    this.setState(prevState => ({
      totalScore: prevState.totalScore + 100
    }));
    this.matrix[Math.floor(index / 5)][Math.floor(index % 5)] += 1;
    this.checkIfBingo();
  };


  removeFromScore = index => {
    this.setState(prevState => ({
      totalScore: prevState.totalScore - 100
    }));
    this.matrix[Math.floor(index / 5)][Math.floor(index % 5)] -= 1;
    this.checkIfBingoLost();
  };

  submitScoreBtn = name => {
    submitScore(this.state.totalScore, name);
  };

  render() {
    return (
      <div>
        <Header />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-10 gameBoard'>
              <div>
                <ScoreTracker totalScore={this.state.totalScore} />
              </div>
              <div className='btn-group btn-matrix'>
                {this.createGameBoard()}
              </div>
            </div>
            <div className='col-2 scoreResults pull-right'>
              <SubmitScore submitBtn={this.submitScoreBtn} />
              <ScoreScreen scoreResults={this.state.scoreResults} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
