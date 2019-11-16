import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./registerTeam.css";
class RegisterTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameError: false,
      teamNameError: false,
      teamUserName: "",
      teamName: "",
      winnings: 0,
      firsts: 0,
      seconds: 0,
      thirds: 0
    };
  }
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
            <label htmlFor="teamuserName">Team User Name:</label>
            <input
              type="text"
              id="teamUserName"
              required
              onChange={e => {
                this.setState({ teamUserName: e.target.value });
              }}
            ></input>
            <label htmlFor="teamName">Team Name:</label>
            <input type="text" id="teamName" required></input>
            <label htmlFor="winnings">Winnings</label>
            <input type="text" id="winnings" defaultValue="0"></input>
            <label htmlFor="first">1st Place Wins:</label>
            <input type="text" id="first" defaultValue="0"></input>
            <label htmlFor="second">2nd Place Wins:</label>
            <input type="text" id="second" defaultValue="0"></input>
            <label htmlFor="third">3rd Place Wins:</label>
            <input type="text" id="third" defaultValue="0"></input>
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
