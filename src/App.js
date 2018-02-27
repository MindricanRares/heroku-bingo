import React, { Component } from "react";
import "./App.css";
import BingoCard from "./components/bingo-card";
import ScoreTracker from "./components/score-tracker";
import Header from "./components/header";
import Footer from "./components/footer";
import SubmitScore from "./components/submit-score";
import ScoreScreen from "./components/score-screen";

class App extends Component {
  possibleAnswers = [
    "Know-it-all",
    "Someone is typing",
    "Misuse of words",
    "Someone snezees",
    "Innapropriate joke",
    "Foreign accent",
    "Loud talker",
    "Nothing accomplished",
    "On the same page",
    "Weather mention",
    "Sports mention",
    "Someone calling from the car",
    "Someone calling from home",
    "Dog barking",
    "Cellphone ringing",
    "Argument",
    "Know it all",
    "Dropped caller",
    "Someone enters late",
    "Some one repeats themselvs",
    "Uncontrollable cough",
    "Win win",
    "Can everyone hear me",
    "Is ____ on the call",
    "Nothing accomplished",
    "Some one has bad reception",
    "Questions avoided",
    "Is everyone here",
    "Soft talker",
    "Talk offline",
    "Can you repeat that",
    "Any updates",
    "Testing team",
    "How are things with _",
    "Working on it",
    "No updates",
    "I`ll take it as a follow up",
    "Laughing",
    "Are you still working on",
    "Talk to you later",
    "I`ll run some quick tests",
    "Sighing",
    "Can i asign this to you",
    "What`s the problem",
    "I will take a look",
    "Do you need any help",
    "Can you see my screen",
    "Backlog mention"
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

    this.colorMatrix = [];

    this.addToScore.bind(this);
    this.alreadyHasDiagonalBing = false;
    this.alreadyHasInverterdDiagonalBongp = false;
    this.alreadyHasLineBingo = [false, false, false, false, false];
    this.alreadyHasColumnBingo = [false, false, false, false, false];

    // this.gameBoard;
    this.bingoCardBackground = "";
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

  pickAnswers = () => {
    console.log(`Answers length: ${this.possibleAnswers.length}`);
    while (this.answers.length < 25) {
      var randomnumber =
        Math.floor(Math.random() * this.possibleAnswers.length - 1) + 1;
      if (this.answers.indexOf(this.possibleAnswers[randomnumber]) > -1)
        continue;
      console.log(`${randomnumber} , ${this.possibleAnswers[randomnumber]}`);
      this.answers[this.answers.length] = this.possibleAnswers[randomnumber];
    }
  };

  createGameBoard = () => {
    // debugger;
    this.answers[12] = "Bingo";
    this.matrix[2][2] = 1;
    this.gameBoard = this.answers.map((answer, index) => {
      return (
        <div key={index} className="btn btn-default">
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
    this.matrix[Math.floor(index / 5)][Math.floor(index % 5)] = 1;
    this.checkIfBingo();
  };

  removeFromScore = index => {
    this.setState(prevState => ({
      totalScore: prevState.totalScore - 100
    }));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div >
            <ScoreTracker totalScore={this.state.totalScore} />
          </div>
          <div className="btn-group btn-matrix">{this.createGameBoard()}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
