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

  smallScreenExtender(value, memberRole) {
    if (this.state.extended) {
      return (
        <div id="blurBackground">
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
