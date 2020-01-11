import React, { Component } from "react";

import TriviaContext from "../../../context";
import "./roster.css";

import { withRouter } from "react-router-dom";

//displays current members of the team
class Roster extends Component {
  static defaultProps = {};
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.userInfo && value.teamInfo.members) {
            const members = value.teamMembers.map(member => (
              <li className="memberList" key={member.username}>
                <div className="rosterLabel">Name: </div>
                <div className="rosterName">{member.nickname}</div>

                <div className="rosterLabel rosterRoleLabel">Role: </div>
                <div className="rosterName rosterRole">{member.role}</div>
              </li>
            ));
            return (
              <section id="roster">
                <h3>Roster</h3>

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
