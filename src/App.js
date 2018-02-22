import React, { Component } from "react";
import "./App.css";
import BingoCard from "./components/bingo-card";
import ScoreTracker from "./components/score-tracker";

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
  constructor() {
    super();
    this.state = {
      totalScore: 0
    };
    this.pickAnswers();
    
  }
  answers=[];
  

  pickAnswers = () => {
    while (this.answers.length < 25) {
      var randomnumber = Math.floor(Math.random() * 33) + 1;
      if (this.answers.indexOf(randomnumber) > -1) continue;
      this.answers[this.answers.length] =this.possibleAnswers[randomnumber];
    }
  };
  
  createGameBoard = () => {
    let retvalue = this.answers.map((answer,index) => {
      return (
        <div key={index} className="btn btn-default">
          <BingoCard
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
      <div className="App container">
        <ScoreTracker totalScore={this.state.totalScore} />
        <div className="btn-group btn-matrix">{this.createGameBoard()}</div>
      </div>
    );
  }
}
export default App;
