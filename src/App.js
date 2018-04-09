import React, { Component } from "react";
import "./App.css";
import BingoCard from "./components/bingo-card";
import ScoreTracker from "./components/score-tracker";
import Header from "./components/header";
import { subscribeToResults, submitScore, showNumberOfPlayers, getDefaultAnswers } from "./api";
import ScoreScreen from "./components/score-screen";
import SubmitScore from "./components/submit-score";
import Cookies from 'universal-cookie'
import NameModal from "./components/name-modal";
import NewBingoAnswers from "./components/new-bingo-answer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./components/bingo-game";
import {Navbar,Nav,MenuItem,NavDropdown,NavItem} from 'react-bootstrap'


class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/' >Home </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav>
              <NavItem>
                <Link to='Sessions' > Sessions(Highly experimental) </Link>
              </NavItem>
            </Nav>
          </Navbar>
          <Route exact path='/' component={Game} />
          <Route path='/Sessions' component={NewBingoAnswers} />
        </div>
      </Router>
    );
  }
}
export default App;
