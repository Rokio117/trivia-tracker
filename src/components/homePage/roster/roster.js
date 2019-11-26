import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TriviaContext from "../../../context";
import "./roster.css";
import store from "../../../store";
class Roster extends Component {
  static defaultProps = {};
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.userInfo && value.teamInfo.members) {
            // const captains = value.teamInfo.members
            //   .filter(member => member.role === "Captain")
            //   .map(captain => store.getNameFromUserName(captain.userName));
            const members = value.teamInfo.members
              .map(member => store.getUserFromUserName(member.userName))
              .map(user => (
                <li className="captainList" key={user.userName}>
                  <div className="rosterLabel">Name: </div>
                  <div className="rosterName">{user.name}</div>

                  <div className="rosterLabel">Role: </div>
                  <div className="rosterName">
                    {store.getRoleOfUser(
                      user.userName,
                      value.teamInfo.teamCode
                    )}
                  </div>
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
