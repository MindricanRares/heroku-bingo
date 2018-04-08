
import React, { Component } from "react";
class SubmitScore extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasSubmitedResult=false;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  validateName(name) {
    return /^[A-Za-z\s]+$/.test(name);
  }

  handleSubmit() {
    this.props.submitBtn();
    this.hasSubmitedResult=true;
    this.forceUpdate();
  }

  render() {
    if(this.hasSubmitedResult){
      return(
        <div>
          <h1>Thanks for playing</h1>
        </div>
      )
    }
    return (
      <div className='score-result-item'>
        <h1>Player name: {this.props.playerName}</h1>
        <button type='button' className='btn btn-default' onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
export default SubmitScore;
