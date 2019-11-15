import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TriviaContext from "../../../context";
import "./roster.css";
class Roster extends Component {
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          const captains = value.teamInfo.members
            .filter(member => member.role === "Captain")
            .map(captain => captain.name);
          const members = value.teamInfo.members
            .map(member => member.name)
            .map(name => <li className="captainList">{name} </li>);
          return (
            <section id="roster">
              <h2>Roster</h2>
              <p id="captain">Captain(s): {captains}</p>
              <label htmlFor="members">Members:</label>
              <ul id="members">{members}</ul>
            </section>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default Roster;
