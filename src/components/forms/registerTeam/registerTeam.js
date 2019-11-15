import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./registerTeam.css";
class RegisterTeam extends Component {
  render() {
    return (
      <div>
        <header>
          <h2>Register Team</h2>
        </header>
        <fieldset>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.history.push("/home");
            }}
          >
            <label htmlFor="teamName">Team Name:</label>
            <input type="text" id="teamName" required></input>
            <label htmlFor="winnings">Winnings</label>
            <input type="text" id="winnings" required></input>
            <label htmlFor="first">1st Place Wins:</label>
            <input type="text" id="first"></input>
            <label htmlFor="second">2nd Place Wins:</label>
            <input type="text" id="second"></input>
            <label htmlFor="third">3rd Place Wins:</label>
            <input type="text" id="third"></input>
            <label htmlFor="icon">Choose an icon</label>
            <select id="icon" required></select>
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={() => this.props.history.push("/home")}
            >
              Cancel
            </button>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default withRouter(RegisterTeam);
