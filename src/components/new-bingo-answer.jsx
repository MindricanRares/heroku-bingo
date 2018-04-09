import React, { Component } from 'react';
import {FormControl,Button} from "react-bootstrap";

class NewBingoAnswers extends Component{
  constructor(props, context) {
    super(props, context);


    this.state = {
      value: ''
    };
  }

  handleChange=(e)=> {
    this.setState({ value: e.target.value });
  }

  sendNewAnswer=()=>{
    console.log(this.state.value.split(','));
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
      </div>
    );
  }
}

export default NewBingoAnswers;
