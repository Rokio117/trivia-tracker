import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";
import TriviaContext from "../../../context";
import { withRouter } from "react-router-dom";
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
          if (value.userInfo && value.teamInfo.members) {
            console.log(value.userInfo, "value.userINfo");
            console.log(value.teamInfo.members, "value.teaminfo.members");
            const memberRole = value.teamInfo.members.find(
              member => member.username === value.userInfo.username
            ).role;
            return (
              <nav id="navParent">
                <p id="greeting">Hello, {value.userInfo.nickname}</p>
                {this.chooseTeamRender(value.userTeams.length)}
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
          } // else this.props.history.push("/");//keep an eye on this
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(NavBar);
