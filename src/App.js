import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import NewBingoAnswers from "./components/new-bingo-answer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./components/bingo-game";
import {Navbar,Nav,NavItem} from 'react-bootstrap'
import CreateSessions from './components/create-session'
import EnterSession from "./components/enter-sessions";

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
                <Link to='CreateSessions' > Create Sessions </Link>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <Link to='EnterSessions' > Enter Sessions </Link>
              </NavItem>
            </Nav>
          </Navbar>


          <Route exact path='/' component={Game} />
          <Route path='/CreateSessions' component={CreateSessions} />
          <Route path='/EnterSessions' component={EnterSession} />
        </div>
      </Router>
    );
  }
}
export default App;
