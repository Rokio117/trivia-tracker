import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TriviaContext from "../../../context";
import "./roster.css";
class Roster extends Component {
  static defaultProps = {};
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.userInfo && value.teamInfo) {
            console.log(
              value.userInfo,
              "userinfo",
              value.teamInfo,
              "teamInfo in roster"
            );
            const captains = value.teamInfo.members
              .filter(member => member.role === "Captain")
              .map(captain => captain.name);
            const members = value.teamInfo.members
              .map(member => member.name)
              .map((name, i) => (
                <li className="captainList" key={i++}>
                  {name}{" "}
                </li>
              ));
            return (
              <section id="roster">
                <h2>Roster</h2>
                <p id="captain">Captain(s): {captains}</p>
                <label htmlFor="members">Members:</label>
                <ul id="members">{members}</ul>
              </section>
            );
          }
          return (
            <section id="roster">
              <h2>Roster</h2>
              <p id="captain">Captain(s): none</p>
              <label htmlFor="members">Members: none</label>
              <ul id="members"></ul>
            </section>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default Roster;
