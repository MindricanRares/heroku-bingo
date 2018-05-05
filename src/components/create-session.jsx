import React, { Component } from 'react';
import {FormGroup,FormControl,Button,Grid,Row,Col} from 'react-bootstrap'
import "./../App.css";
import Preview from './preview';
import {pickAnswers,guid} from './../apputils'
import { sendSesionAnswers } from '../api';
import Clipboard from 'react-clipboard.js';

class CreateSession extends Component{
  constructor() {
    super();
    this.state=({
      generateKeyMessage:"",
      textAreaValue:"",
      showLivePreview:false,
      userCards:[],
      guidNumber:0
    })
  }


  displayMessage=()=>{
    // return <p>{this.state.generateKeyMessage}</p>;
    if(this.state.generateKeyMessage!=""){
      return(
        <div className="clipboard-msg">
          <Clipboard data-clipboard-text={this.state.guidNumber}  className='btn btn-success'>
            {this.state.generateKeyMessage}
          </Clipboard>
        </div>
      );
    }

  }

  textAreaValidated=()=>{
    try {
      if(this.state.textAreaValue.split(',')instanceof Array){
        debugger;
        const userAnswers=this.state.textAreaValue.split(',');
        let uniqueUserAnswers= Array.from(new Set(userAnswers));
        if(uniqueUserAnswers.length<35){
          return false;
        }
        if (userAnswers[userAnswers.length-1]==="") {
          return false;
        }
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  }

  generateSession=()=>{
    if(this.textAreaValidated()){
      this.state.guidNumber=guid();
      sendSesionAnswers(this.state.guidNumber,this.state.textAreaValue.split(','))
      this.setState({generateKeyMessage:"Session created your key is : "+ this.state.guidNumber})

    }else{
      this.setState({generateKeyMessage:"Invalid text see if respects the rules"})
    }
  }

  handleChange=(event)=> {
    this.setState({textAreaValue: event.target.value},()=>{
      if(this.textAreaValidated()){
        this.setState({
          userCards:pickAnswers(this.state.textAreaValue.split(',')),
          showLivePreview:true
        })
        this.forceUpdate();
      }else{
        this.setState({
          showLivePreview:false
        })
      }
    });

  }

  generateExample=()=>{
    return   ["Know-it-all",
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
    "Backlog mention"].join(',\n')
  }



  displayLivePreview=()=>{
    if(this.state.showLivePreview){
      return (<Preview answers={this.state.userCards} />)
    }else{
      return(
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-10 gameBoard'>
              <div className='btn-group btn-matrix'>
                <h>Live preview here</h>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>



        <Grid>
          <Row className='show-grid'>
            <h1>Here you can create your own custom bingo game with <b>your</b> cards</h1>
            <br />
            <h3>All you have to do is follow these simple steps</h3>
            <ol>
              <li>Pick at least 40 possible cards</li>
              <li>Separate them by the comma sign , </li>
              <li>Put them in text box bellow</li>
              <li>Click generate key</li>
              <li>Enter the key in Enter session tab</li>
              <li>Have fun</li>
            </ol>
          </Row>
          <Row className='show-grid'>
            <Col lg={3} >
              <FormGroup controlId='formControlsTextarea'>
                <FormControl componentClass='textarea' placeholder={this.generateExample()} rows='40' onChange={this.handleChange} />
              </FormGroup>
              <Button onClick={this.generateSession}>Generate Session key</Button>
            </Col>
            <Col lg={9} >
              {this.displayLivePreview()}
              {this.displayMessage()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CreateSession;
