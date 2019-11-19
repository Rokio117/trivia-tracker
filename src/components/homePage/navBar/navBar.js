import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";
import TriviaContext from "../../../context";
class NavBar extends Component {
  roleRender = role => {
    if (role === "Captain") {
      return (
        <>
          <NavLink className="navBarLink" to={"/manage"}>
            Manage Team
          </NavLink>
          <NavLink className="navBarLink" to={"/addEvent"}>
            Add Event
          </NavLink>
        </>
      );
    }
    if (role === "Reporter") {
      return (
        <>
          <NavLink className="navBarLink" to={"/addEvent"}>
            Create Event
          </NavLink>
        </>
      );
    }
  };
  chooseTeamRender = number => {
    if (number > 1) {
      return (
        <NavLink className="navBarLink" to={"/teamPick"}>
          Choose Team
        </NavLink>
      );
    }
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          const memberRole = value.teamInfo.members.find(
            member => member.userName === value.userInfo.userName
          ).role;
          return (
            <nav id="navParent">
              <p id="greeting">Hello, {value.userInfo.name}</p>
              <NavLink className="navBarLink" to={"/home"}>
                Home
              </NavLink>
              {this.chooseTeamRender(value.userInfo.teams.length)}
              <NavLink className="navBarLink" to={"/settings"}>
                Settings
              </NavLink>
              <NavLink className="navBarLink" to={"/new"}>
                New team
              </NavLink>
              {this.roleRender(memberRole)}
              <button id="log-out-button" onClick={() => this.props.logout()}>
                Log out
              </button>
            </nav>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default NavBar;
