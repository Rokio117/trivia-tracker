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
        {value => {
          return (
            <>
              <NavBar logout={this.props.logout} />
              <header>
                <h1>{value.teamInfo.name}</h1>
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
