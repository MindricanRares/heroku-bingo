import React, { Component } from 'react';
import {FormControl,Button,Grid,Row} from "react-bootstrap";
import SessionGame from './session-bingo-game';
import { sendSesionAnswers, getSessionAnswers } from '../api';

class EnterSession extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      sessionGUID:'',
      defaultAswers:["loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading","loading"]
    };
  }

  handleChangeSessionGUID=(e)=> {
    this.setState({ sessionGUID: e.target.value });
  }
  getNewAnswers=()=>{
    getSessionAnswers(this.state.sessionGUID,(err,sessionAnswers)=>{
      this.setState({defaultAswers:sessionAnswers})
      this.forceUpdate();
      console.log(this);
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <FormControl
            type='text'
            value={this.state.sessionGUID}
            placeholder='Enter text'
            onChange={this.handleChangeSessionGUID}
          />
        </Row>
        <br />
        <Row>
          <Button bsStyle='primary center-block 'onClick={this.getNewAnswers}   > Get answers</Button>
        </Row>
        <SessionGame answers={this.state.defaultAswers} />
      </Grid>
    );
  }
}

export default EnterSession;
