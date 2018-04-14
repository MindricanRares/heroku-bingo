import React, { Component } from 'react';
import BingoCard from "./bingo-card";

class Preview extends Component{
  createGameBoard = () => {
    this.props.answers[12] = "Bingo";
    this.gameBoard = this.props.answers.map((answer, index) => {
      return (
        <div key={index} className='btn btn-default'>
          <BingoCard
            backGroundColor={""}
            index={index}
            answer={answer}
          />
        </div>
      );
    });
    return this.gameBoard;
  };

  render() {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-10 gameBoard'>
              <div className='btn-group btn-matrix'>
                {this.createGameBoard()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Preview;
