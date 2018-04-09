import React, { Component } from 'react';
import {FormControl,Button} from "react-bootstrap";
import { sendSesionAnswers, getSessionAnswers } from '../api';
import BingoCard from './bingo-card';
import SessionGame from './session-bingo-game';

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
    this.setState({
      newGUID:guidNumber
    });
    sendSesionAnswers(guidNumber,this.state.value.split(','))
  }

  getNewAnswers=()=>{
    debugger;
    getSessionAnswers(this.state.sessionGUID,(err,sessionAnswers)=>{

      this.setState({defaultAswers:sessionAnswers})
      this.forceUpdate();
      console.log(this);
    })
  }
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
        <SessionGame answers={this.state.defaultAswers} />
        <p>Your guid is {this.state.newGUID}</p>
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
