import React, { Component } from "react";
import "./App.css";
import BingoCard from "./components/bingo-card";
import ScoreTracker from "./components/score-tracker";
import Header from "./components/header";
import { subscribeToResults, submitScore, showNumberOfPlayers } from "./api";
import ScoreScreen from "./components/score-screen";
import SubmitScore from "./components/submit-score";
import Cookies from 'universal-cookie'
import pickAnswers from "./apputils";
import NameModal from "./components/name-modal";

const centerIndexColumn=2;
const centerIndexRow=2;
const wildCard=1;
const cookie = new Cookies();

class App extends Component {

  constructor() {
    super();
    const nameCookieResult=this.checkForNameCookie();
    //Show propriety needs to be decided before setting the component state
    this.state = {
      totalScore: 0,
      scoreResults: [],
      numberOfPlayers:0,
      show:nameCookieResult.modalIsVisible,
      playerName:nameCookieResult.playerName
    };
    this.checkForAnswersCookie();
    this.subscribeToSocketIo();
    this.intializeScoreMatrixWithZeroes();
    this.settingUpBingoBoard();
  }



  intializeScoreMatrixWithZeroes=()=>{
    this.matrix = [];
    for (let i = 0; i < 5; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < 5; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  checkForNameCookie=()=>{
    let modalIsVisible=false;
    let playerName="";

    const playerNameCookie = cookie.get('playerNameCookie');
    if(playerNameCookie){
      playerName=playerNameCookie;
    }else{
      modalIsVisible=true;
    }
    return{playerName,modalIsVisible}
  }

  checkForAnswersCookie=()=>{
    const lastAnswers = cookie.get('answers')
    if(lastAnswers){
      this.answers=lastAnswers;
    }else{
      this.answers = pickAnswers();
      cookie.set('answers',this.answers,{
        path:'/',
        expires:new Date(new Date().getTime() + 120*60000)
      });
    }
  }

  subscribeToSocketIo=()=>{
    subscribeToResults((err, scoreResults) =>
      this.setState({
        scoreResults
      })
    );
    showNumberOfPlayers ((err, numberOfPlayers) =>
      this.setState({
        numberOfPlayers
      })
    );
  }

  settingUpBingoBoard=()=>{
    this.colorMatrix = [];
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
      this.unColorBingoColumn(k);
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
      this.unColorBingoLine(k);
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
      this.unColorInvertedDiagonalBingo();
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
      this.unColorDiagonalBingo();
      console.log("Bingo");
    }
  }

  unColorBingoColumn(k) {
    this.colorMatrix[k] = "";
    this.colorMatrix[k + 5] = "";
    this.colorMatrix[k + 10] = "";
    this.colorMatrix[k + 15] = "";
    this.colorMatrix[k + 20] = "";
  }

  unColorBingoLine(k) {
    this.colorMatrix[5 * k] = "";
    this.colorMatrix[5 * k + 1] = "";
    this.colorMatrix[5 * k + 2] = "";
    this.colorMatrix[5 * k + 3] = "";
    this.colorMatrix[5 * k + 4] = "";
  }

  unColorDiagonalBingo() {
    this.colorMatrix[0] = "";
    this.colorMatrix[6] = "";
    this.colorMatrix[12] = "";
    this.colorMatrix[18] = "";
    this.colorMatrix[24] = "";
  }

  unColorInvertedDiagonalBingo() {
    this.colorMatrix[4] = "";
    this.colorMatrix[8] = "";
    this.colorMatrix[12] = "";
    this.colorMatrix[16] = "";
    this.colorMatrix[20] = "";
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
    this.answers[12] = "Bingo";
    this.matrix[centerIndexColumn][centerIndexRow] = wildCard;
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
    submitScore(this.state.totalScore, this.state.playerName);
  };

  displayNumberOfPlayers =()=>{
    if(this.state.numberOfPlayers<2){
      return(
        <h2>You are playing alone</h2>
      )
    }else if(this.state.numberOfPlayers===2){
      return(
        <h2>You and another player are participating in this game</h2>
      )
    }else{
      return(
        <h2>You and {this.state.numberOfPlayers-1} more players are participating in this game</h2>
      )
    }
  }

  getNameFromModal=(name)=> {
    this.setState({ show: false });
    this.setState({
      playerName:name
    });
    cookie.set('playerNameCookie',name,{
      path:'/',
      expires:new Date(new Date().getTime() + 120*60000)
    });
  }

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
              <SubmitScore submitBtn={this.submitScoreBtn} playerName={this.state.playerName} />
              <ScoreScreen scoreResults={this.state.scoreResults} />
            </div>
            {this.displayNumberOfPlayers()}
          </div>
        </div>
        <NameModal getNameFromModal={this.getNameFromModal} show={this.state.show} />
      </div>
    );
  }
}
export default App;
