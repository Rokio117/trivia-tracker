import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";
class NavBar extends Component {
  render() {
    return (
      <nav id="navParent">
        <NavLink className="navBarLink" to={"/home"}>
          Home
        </NavLink>
        <NavLink className="navBarLink" to={"/teamPick"}>
          Choose Team
        </NavLink>
        <NavLink className="navBarLink" to={"/manage"}>
          Manage Team
        </NavLink>
        <NavLink className="navBarLink" to={"/settings"}>
          Settings
        </NavLink>
        <NavLink className="navBarLink" to={"/addEvent"}>
          Add Event
        </NavLink>
        <NavLink className="navBarLink" to={"/new"}>
          New team
        </NavLink>
        <button id="log-out-button" onClick={() => this.props.logout()}>
          Log out
        </button>
      </nav>
    );
  }
}

export default NavBar;
