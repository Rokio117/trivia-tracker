import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./registerTeam.css";
import TriviaContext from "../../../context";
import { loader } from "../../loader";
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
      nameTaken: false,
      loading: false
    };
  }
  buttonChoice = team => {
    if (team) {
      return (
        <button
          type="button"
          id="registerTeamCancelButton"
          onClick={() => this.props.history.push("/home")}
        >
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

  setLoading = loading => {
    this.setState({ loading: loading });
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.userInfo) {
            return (
              <div>
                {loader.displayLoading(this.state.loading)}
                <header>
                  <h2>Register Team</h2>
                </header>

                <form
                  id="registerTeamForm"
                  onSubmit={e => {
                    e.preventDefault();
                    this.setLoading(true);
                    store.teamExists(this.state.teamusername).then(response => {
                      if (response.message) {
                        this.setLoading(false);
                        this.props.history.push("/error");
                      } else if (response.length) {
                        this.setLoading(false);
                        this.setState({ nameTaken: true });
                      } else {
                        const winnings =
                          parseInt(this.state.firsts) +
                          parseInt(this.state.seconds) +
                          parseInt(this.state.thirds);
                        const newTeam = {
                          teamname: this.state.teamName,
                          teamcode: this.state.teamusername,
                          members: [
                            {
                              username: value.userInfo.username,
                              role: "Captain"
                            }
                          ],
                          wins: winnings,
                          firstplace: parseInt(this.state.firsts),
                          secondplace: parseInt(this.state.seconds),
                          thirdplace: parseInt(this.state.thirds),
                          winnings: parseInt(this.state.winnings),
                          history: []
                        };
                        //push new team into DB, then add team to player info
                        store.postNewteam(newTeam).then(newTeamResponse => {
                          if (
                            newTeamResponse.error === "Unauthorized request "
                          ) {
                            this.setLoading(false);
                            this.props.history.push("/error");
                          } else
                            store
                              .addToTeam(
                                value.userInfo.username,
                                newTeamResponse[0].teamcode,
                                "Captain"
                              )
                              .then(response => {
                                this.setLoading(false);
                                return this.props.loginUser(
                                  value.userInfo.username,
                                  newTeamResponse[0].teamcode
                                );
                              });
                        });
                      }
                    });
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
                    type="number"
                    id="addTeamWinnings"
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
                  <button type="submit" id="registerTeamSubmitButton">
                    Submit
                  </button>
                  {this.buttonChoice(Object.keys(value.teamInfo).length)}
                </form>
              </div>
            );
          }
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(RegisterTeam);
