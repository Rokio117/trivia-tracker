import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./registerTeam.css";
import TriviaContext from "../../../context";
import store from "../../../store";

class RegisterTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameError: false,
      teamNameError: false,
      teamusername: "",
      teamName: "",
      winnings: 0,
      firsts: 0,
      seconds: 0,
      thirds: 0,
      nameTaken: false
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
  takenName = teamNameTaken => {
    if (teamNameTaken) {
      return <p className="error">That name is taken</p>;
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
                      if (store.teamExists(this.state.teamusername)) {
                        this.setState({ nameTaken: true });
                      } else {
                        const winnings =
                          parseInt(this.state.firsts) +
                          parseInt(this.state.seconds) +
                          parseInt(this.state.thirds);
                        const newTeam = {
                          name: this.state.teamName,
                          teamCode: this.state.teamusername,
                          members: [
                            {
                              username: value.userInfo.username,
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
                      }
                    }}
                  >
                    <label htmlFor="teamusername">Team User Name:</label>
                    <input
                      type="text"
                      id="teamusername"
                      required
                      onChange={e => {
                        this.setState({
                          teamusername: e.target.value,
                          nameTaken: false
                        });
                      }}
                    ></input>
                    {this.takenName(this.state.nameTaken)}
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
                      type="number"
                      id="first"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ firsts: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="second">2nd Place Wins:</label>
                    <input
                      type="number"
                      id="second"
                      placeholder="0"
                      onChange={e => {
                        this.setState({ seconds: e.target.value });
                      }}
                    ></input>
                    <label htmlFor="third">3rd Place Wins:</label>
                    <input
                      type="number"
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
          } else this.props.history.push("/");
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(RegisterTeam);
