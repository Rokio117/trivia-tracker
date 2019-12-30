import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TriviaContext from "../../../context";
import "./roster.css";
import store from "../../../store";
import { withRouter } from "react-router-dom";
class Roster extends Component {
  static defaultProps = {};
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.userInfo && value.teamInfo.members) {
            const members = value.teamMembers.map(member => (
              <li className="captainList" key={member.username}>
                <div className="rosterLabel">Name: </div>
                <div className="rosterName">{member.nickname}</div>

                <div className="rosterLabel">Role: </div>
                <div className="rosterName">{member.role}</div>
              </li>
            ));
            return (
              <section id="roster">
                <h2>Roster</h2>
                <label htmlFor="members">Members:</label>
                <ul id="members">{members}</ul>
              </section>
            );
          }
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(Roster);
