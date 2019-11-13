import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Standings from "../standings/standings";
import Roster from "../roster/roster";
class Home extends Component {
  render() {
    return (
      <>
        <NavBar />
        <header>
          <h1>Team Name</h1>
        </header>
        <Standings />
        <Roster />
      </>
    );
  }
}

export default Home;
