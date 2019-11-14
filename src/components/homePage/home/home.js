import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Standings from "../standings/standings";
import Roster from "../roster/roster";
import TriviaContext from "../../../context";
class Home extends Component {
  render() {
    return (
      <TriviaContext.Consumer>
        {context => {
          return (
            <>
              <NavBar />
              <header>
                <h1>{context.teamInfo.name}</h1>
              </header>
              <Standings />
              <Roster />
            </>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default Home;
