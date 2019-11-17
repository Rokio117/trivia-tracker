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
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.userInfo && value.teamInfo) {
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
                        this.state.firsts +
                        this.state.seconds +
                        this.state.thirds;
                      const newTeam = {
                        name: this.state.teamName,
                        teamCode: this.state.teamUserName,
                        members: {
                          userName: value.userInfo.userName,
                          role: "Captain",
                          name: value.userInfo.name
                        },
                        wins: winnings,
                        firstPlace: this.state.firsts,
                        secondPlace: this.state.seconds,
                        thirdPlace: this.state.thirds,
                        winnings: this.state.winnings,
                        history: []
                      };

                      store.teams.push(newTeam);
                      store.users
                        .find(user => user.userName === value.userInfo.userName)
                        .teams.push({
                          teamName: this.state.teamName,
                          teamCode: this.state.teamUserName
                        });
                      console.log(
                        store.teams,
                        store.users.find(
                          user => user.userName === value.userInfo
                        ).teams
                      );
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
                      defaultValue="0"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ winnings: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="first">1st Place Wins:</label>
                    <input
                      type="text"
                      id="first"
                      defaultValue="0"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ firsts: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="second">2nd Place Wins:</label>
                    <input
                      type="text"
                      id="second"
                      defaultValue="0"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ seconds: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="third">3rd Place Wins:</label>
                    <input
                      type="text"
                      id="third"
                      defaultValue="0"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ thirds: e.target.value });
                      }}
                    ></input>
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
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(RegisterTeam);
