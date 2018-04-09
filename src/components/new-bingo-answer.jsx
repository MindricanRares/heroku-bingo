import React, { Component } from 'react';
import {FormControl,Button} from "react-bootstrap";
import { sendSesionAnswers, getSessionAnswers } from '../api';
import BingoCard from './bingo-card';

class NewBingoAnswers extends Component{
  constructor(props, context) {
    super(props, context);


    this.state = {
      value: '',
      newGUID:'',
      sessionGUID:'',
      defaultAswers:["loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading"]

    };
  }

  handleChange=(e)=> {
    this.setState({ value: e.target.value });
  }
  handleChangeSessionGUID=(e)=> {
    this.setState({ sessionGUID: e.target.value });
  }

  sendNewAnswer=()=>{
    let guidNumber=guid();
    sendSesionAnswers(guidNumber,this.state.value.split(','))
  }

  getNewAnswers=()=>{
    debugger;
    getSessionAnswers(this.state.sessionGUID,(err,sessionAnswers)=>{
      console.log(sessionAnswers);
      this.setState({defaultAswers:sessionAnswers})
    })
  }

  createGameBoard = () => {
    // this.answers[12] = "Bingo";
    // this.matrix[centerIndexColumn][centerIndexRow] = wildCard;
    this.gameBoard = this.state.defaultAswers.map((answer, index) => {
      return (
        <div key={index} className='btn btn-default'>
          <BingoCard
            backGroundColor={''}
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
  render() {
    return (
      <div>
        <FormControl
          type='text'
          value={this.state.value}
          placeholder='Enter text'
          onChange={this.handleChange}
        />
        <Button bsStyle='primary'onClick={this.sendNewAnswer} > Send answers</Button>
        <FormControl
          type='text'
          value={this.state.sessionGUID}
          placeholder='Enter text'
          onChange={this.handleChangeSessionGUID}
        />
        <Button bsStyle='primary'onClick={this.getNewAnswers} > Get answers</Button>
        <div className='btn-group btn-matrix'>
          {this.createGameBoard()}
        </div>
      </div>
    );
  }
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}


export default NewBingoAnswers;
