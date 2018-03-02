import React, { Component } from "react";
const fs = require('fs');
class SubmitScore extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    let jsonData = JSON.stringify(this.state.value);
    fs.writeFile("test.txt", jsonData, function(err) {
        if(err) {
            return console.log(err);
        }
    });

    event.preventDefault();
  }

  render() {
    return (
        <div>
        <label>
          Score:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <button type="button" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
export default SubmitScore;
