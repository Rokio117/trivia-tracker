import React, { Component } from "react";
import RegisterTeam from "../../forms/registerTeam/registerTeam";
import "./noTeamPage.css";
class NoTeamPage extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Home</h1>
        </header>
        <p>
          It looks like you don't have a team! You can register your team, or if
          your team is already registered get their code to be added!
        </p>
        <fieldset>
          <h2>Sign In:</h2>
          <label htmlFor="teamForm">Team User Name: </label>
          <form id="teamForm">
            <input type="text"></input>
            <button type="submit">Submit</button>
          </form>
        </fieldset>
        <RegisterTeam />
      </div>
    );
  }
}
export default NoTeamPage;
