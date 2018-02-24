import React, { Component } from "react";
import "./App.css";
import BingoCard from "./components/bingo-card";
import ScoreTracker from "./components/score-tracker";
import Header from "./components/header";
import Footer from "./components/footer";

class App extends Component {
  possibleAnswers = [
    "1 Know-it-all",
    "2 Someone is typing",
    "3 Misuse of words",
    "4 omeone snezees",
    "5 Innapropriate name",
    "6 Foreign accent",
    "7 Laoud talker",
    "8 Nothing accomplished",
    "9 On the same page",
    "10 Weather mention",
    "11 Sports mention",
    "12 No idea what they are talking about",
    "13 Someone calling from the car",
    "14 Someone calling from home",
    "15 Dog barking",
    "16 Baby crying",
    "17 Someone typing",
    "18 Cellphone ringing",
    "19 Argument",
    "20 Know it all",
    "21 Dropped caller",
    "22 Someone enters late",
    "23 Some one repeats themselvs",
    "24 Uncontrollable cough",
    "25 Win win",
    "26 Can everyone hear me",
    "27 Is ____ on the call",
    "28 Nothing accomplished",
    "29 Some one has bad reception",
    "30 Questions avoided",
    "31 Is everyone here",
    "32 Soft talker",
    "33 Talk offline",
    "34 Can you repeat that"
  ];
  matrix = [];
  constructor() {
    super();
    this.state = {
      totalScore: 0
    };
    this.pickAnswers();
    this.matrix = [];
    for (let i = 0; i < 5; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < 5; j++) {
        this.matrix[i][j] = 0;
      }
    }
    this.addToScore.bind(this);
    this.alreadyHasDiagonalBing = false;
    this.alreadyHasInverterdDiagonalBongp = false;
    this.alreadyHasLineBingo = [false, false, false, false, false];
    this.alreadyHasColumnBingo = [false, false, false, false, false];
  }
  answers = [];
  alreadyHasDiagonalBingo;
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
      console.log("Bingo");
    }
  }

  pickAnswers = () => {
    while (this.answers.length < 25) {
      var randomnumber = Math.floor(Math.random() * 33) + 1;
      if (this.answers.indexOf(randomnumber) > -1) continue;
      this.answers[this.answers.length] = this.possibleAnswers[randomnumber];
    }
  };

  createGameBoard = () => {
    let retvalue = this.answers.map((answer, index) => {
      return (
        <div key={index} className="btn btn-default">
          <BingoCard
            index={index}
            answer={answer}
            totalScore={this.state.totalScore}
            addToScore={this.addToScore}
            removeFromScore={this.removeFromScore}
          />
        </div>
      );
    });
    return retvalue;
  };

  addToScore = index => {
    this.setState(prevState => ({
      totalScore: prevState.totalScore + 100
    }));
    this.matrix[Math.floor(index / 5)][Math.floor(index % 5)] = 1;
    this.checkIfBingo();
  };

  removeFromScore = () => {
    this.setState(prevState => ({
      totalScore: prevState.totalScore - 100
    }));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <ScoreTracker totalScore={this.state.totalScore} />
          <div className="btn-group btn-matrix">{this.createGameBoard()}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
