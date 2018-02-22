import React, { Component } from "react";

class BingoCard extends Component {
  constructor(props) {
    super(props);
    this.state={
      totalScore:props.totalScore
    }
    this.numberOfTimesClicked = 0;
  }
  bingoBtnClick = () => {
    if (this.numberOfTimesClicked <= 3) {
      console.log(this.numberOfTimesClicked);
      this.numberOfTimesClicked += 1;
      this.props.addToScore();
    } else {
    }
  };
  

  deleteBtnClick = ()=>{
    if(this.numberOfTimesClicked>0){
      this.numberOfTimesClicked-=1;
      this.props.removeFromScore();
    }
  }
  

  render() {
    return (
      <div>
        <button
          onClick={this.bingoBtnClick.bind(this)}
          type="button"
          className="btn btn-default"
        >
          This is a test
        </button>
        <p>Clicked: {this.numberOfTimesClicked}</p>
        <button onClick={this.deleteBtnClick} className="btn">Del</button>
      </div>
    );
  }
}
export default BingoCard;
