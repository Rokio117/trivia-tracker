import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";
import TriviaContext from "../../../context";
import { withRouter } from "react-router-dom";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { extended: false };
  }
  //The options available to the player depend on their rank
  //players with role Captain have all access
  //players with role reporter cannot manage the team
  //players with role member or guest cannot report an event or modify the team
  roleRender = (role, style) => {
    if (role === "Captain") {
      if (style === "small") {
        return (
          <>
            <div className="miniNavBar">
              <NavLink className="navBarLink" to={"/manage"}>
                Manage Team
              </NavLink>
            </div>

            <div className="miniNavBar">
              <NavLink className="navBarLink" to={"/addEvent"}>
                Add Event
              </NavLink>
            </div>
          </>
        );
      } else
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
      if (style === "small") {
        return (
          <>
            <div className="miniNavBar">
              <NavLink className="navBarLink" to={"/addEvent"}>
                Add Event
              </NavLink>
            </div>
          </>
        );
      } else
        return (
          <NavLink className="navBarLink" to={"/addEvent"}>
            Add Event
          </NavLink>
        );
    }
  };
  //the option to choose which team to display only renders if the player is on multiple teams
  chooseTeamRender = (number, style) => {
    if (number > 1) {
      if (style === "small") {
        return (
          <div className="miniNavBar">
            <NavLink className="navBarLink" to={"/teamPick"}>
              Choose team
            </NavLink>
          </div>
        );
      } else
        return (
          <NavLink className="navBarLink" to={"/teamPick"}>
            Choose team
          </NavLink>
        );
    }
  };
  //nav menu to display while on mobile devices
  smallScreenExtender(value, memberRole) {
    if (this.state.extended) {
      return (
        <div id="blurBackground">
          <div id="windowFrame">
            <nav id="dropDownNavWindow">
              <h3 id="smallSettingsHeader">Settings</h3>
              {this.chooseTeamRender(value.userTeams.length, "small")}
              <div className="miniNavBar">
                <NavLink className="navBarLink " to={"/settings"}>
                  User settings
                </NavLink>
              </div>

              <div className="miniNavBar">
                <NavLink className="navBarLink " to={"/new"}>
                  New team
                </NavLink>
              </div>

              {this.roleRender(memberRole, "small")}
              <button
                onClick={e => this.setState({ extended: false })}
                id="settingsCancelButton"
              >
                Cancel
              </button>
            </nav>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.userInfo && value.teamInfo.members) {
            const memberRole = value.teamInfo.members.find(
              member => member.username === value.userInfo.username
            ).role;
            return (
              <>
                <nav id="navParent">
                  <p id="greeting">Hello, {value.userInfo.nickname}</p>
                  {this.chooseTeamRender(value.userTeams.length)}
                  <NavLink className="navBarLink" to={"/settings"}>
                    User settings
                  </NavLink>
                  <NavLink className="navBarLink" to={"/new"}>
                    New team
                  </NavLink>
                  {this.roleRender(memberRole)}
                  <button
                    className="logoutButton"
                    id="log-out-button"
                    onClick={() => this.props.logout()}
                  >
                    Log out
                  </button>
                </nav>
                <div id="smallScreenNav">
                  {this.smallScreenExtender(value, memberRole)}
                  <p id="greeting">Hello, {value.userInfo.nickname}</p>
                  <button
                    id="dropDownMenu"
                    onClick={e => {
                      if (this.state.extended) {
                        this.setState({ extended: false });
                      } else this.setState({ extended: true });
                    }}
                  >
                    <span className="hamburger"></span>
                    <span className="hamburger"></span>
                    <span className="hamburger bottomHamburger"></span>
                  </button>
                  <button
                    className="logoutButton"
                    id="smallScreenLogoutButton"
                    onClick={() => this.props.logout()}
                  >
                    Log out
                  </button>
                </div>
              </>
            );
          }
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(NavBar);
