import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import NewBingoAnswers from "./components/new-bingo-answer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./components/bingo-game";
// import {Navbar,Nav,NavItem} from 'react-bootstrap'
import CreateSessions from './components/create-session'

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          {/* <Navbar inverse collapseOnSelect>
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
            <Nav>
              <NavItem>
                <Link to='CreateSessions' > CreateSessions </Link>
              </NavItem>
            </Nav>
          </Navbar> */}
          <ul>
            <li> <Link to='/' >Home </Link></li>
            <li> <Link to='Sessions' > Sessions(Highly experimental) </Link></li>
            <li><Link to='CreateSessions' > CreateSessions </Link></li>
          </ul>
          <Route exact path='/' component={Game} />
          <Route path='/Sessions' component={NewBingoAnswers} />
          <Route path='/CreateSessions' component={CreateSessions} />
        </div>
      </Router>
    );
  }
}
export default App;
