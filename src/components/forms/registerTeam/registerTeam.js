import React, { Component } from "react";
import "./registerTeam.css";
class RegisterTeam extends Component {
  render() {
    return (
      <div>
        <header>
          <h2>Register Team</h2>
        </header>
        <fieldset>
          <form>
            <label htmlFor="teamName">Team Name:</label>
            <input type="text" id="teamName"></input>
            <label htmlFor="winnings">Winnings</label>
            <input type="text" id="winnings"></input>
            <label htmlFor="first">1st Place Wins:</label>
            <input type="text" id="first"></input>
            <label htmlFor="second">2nd Place Wins:</label>
            <input type="text" id="second"></input>
            <label htmlFor="third">3rd Place Wins:</label>
            <input type="text" id="third"></input>
            <label htmlFor="icon">Choose an icon</label>
            <select id="icon"></select>
            <button type="submit">Submit</button>
            <button type="cancel">Cancel</button>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default RegisterTeam;
