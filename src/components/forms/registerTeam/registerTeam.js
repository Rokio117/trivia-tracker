import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./registerTeam.css";
import TriviaContext from "../../../context";
import store from "../../../store";

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
  buttonChoice = team => {
    if (team) {
      return (
        <button type="button" onClick={() => this.props.history.push("/home")}>
          Cancel
        </button>
      );
    }
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.userInfo) {
            return (
              <div>
                <header>
                  <h2>Register Team</h2>
                </header>
                <fieldset>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const winnings =
                        parseInt(this.state.firsts) +
                        parseInt(this.state.seconds) +
                        parseInt(this.state.thirds);
                      const newTeam = {
                        name: this.state.teamName,
                        teamCode: this.state.teamUserName,
                        members: [
                          {
                            userName: value.userInfo.userName,
                            role: "Captain"
                          }
                        ],
                        wins: winnings,
                        firstPlace: this.state.firsts,
                        secondPlace: this.state.seconds,
                        thirdPlace: this.state.thirds,
                        winnings: this.state.winnings,
                        history: []
                      };
                      //push new team into DB, then add team to player info
                      store.postNewteam(newTeam);

                      this.props.loginTeam(newTeam);
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
                    <input
                      type="text"
                      id="teamName"
                      required
                      onChange={e => {
                        this.setState({ teamName: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="winnings">Winnings</label>
                    <input
                      type="text"
                      id="winnings"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ winnings: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="first">1st Place Wins:</label>
                    <input
                      type="text"
                      id="first"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ firsts: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="second">2nd Place Wins:</label>
                    <input
                      type="text"
                      id="second"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ seconds: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="third">3rd Place Wins:</label>
                    <input
                      type="text"
                      id="third"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ thirds: e.target.value });
                      }}
                    ></input>
                    <button type="submit">Submit</button>
                    {this.buttonChoice(value.teamInfo)}
                  </form>
                </fieldset>
              </div>
            );
          }
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(RegisterTeam);
