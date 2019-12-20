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
          if (value) {
            return (
              <>
                <NavBar logout={this.props.logout} />
                <header>
                  <h1>{value.teamInfo.teamname}</h1>
                </header>
                <Standings />
                <Roster />
              </>
            );
          } else this.props.history.push("/");
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default Home;
