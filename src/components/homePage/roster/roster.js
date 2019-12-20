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
            // const captains = value.teamInfo.members
            //   .filter(member => member.role === "Captain")
            //   .map(captain => store.getNameFromusername(captain.username));
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
                {/* <p id="captain">Captain(s): {captains}</p> */}
                <label htmlFor="members">Members:</label>
                <ul id="members">{members}</ul>
              </section>
            );
          } else this.props.history.push("/");
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(Roster);
