import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import store from "../../../store";
import TriviaContext from "../../../context";
import "./manageTeam.css";
class ManageTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPlayer: "",
      newMemberRank: "",
      userToChange: "",
      newRank: "",
      winnings: undefined,
      newName: "",
      userNotFound: false,
      duplicateUser: false,
      noNewRank: false,
      noChangeRank: false,
      serverErrorMessage: "",
      addPlayorError: false,
      playerCurrentRank: ""
    };
  }

  componentDidMount() {
    this.props.handlePageReload("/manage");
  }

  changeRole = value => {
    console.log(value, "value in changerole");
    const noCaptains = value.teamMembers.filter(
      member => member.role !== "Captain"
    );
    if (noCaptains.length) {
      const options = noCaptains.map(member => {
        return <option value={member.username}>{member.nickname}</option>;
      });
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            store
              .changeRole(
                this.state.userToChange,
                this.state.newRank,
                value.teamInfo.teamcode
              )
              .then(res => {
                this.props.login(
                  value.userInfo.username,
                  value.teamInfo.teamcode,
                  "/manage"
                );
              });
          }}
        >
          <fieldset>
            <legend htmlFor="changeRole">Change Role</legend>
            <label for="teammateSelect">Player:</label>
            <select
              required
              id="teammateSelect"
              onChange={e => {
                const userCurrentRank = value.teamInfo.members.find(member => {
                  return member.username === e.target.value;
                }).role;

                this.setState({
                  userToChange: e.target.value,
                  playerCurrentRank: userCurrentRank
                });
              }}
            >
              <option value="" className="playerOption"></option>
              {options}
            </select>
            <label for="roleChange">Role:</label>
            <select
              required
              id="roleChange"
              onChange={e => this.setState({ newRank: e.target.value })}
            >
              <option value="" disabled selected>
                {this.state.playerCurrentRank}
              </option>
              <option value="Captain">Captain</option>
              <option value="Reporter">Reporter</option>
              <option value="Member">Member</option>
              <option value="Guest">Guest</option>
            </select>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      );
    }
  };

  addUserErrorDisplay = addPlayorError => {
    if (addPlayorError) {
      return <p className="error">{this.state.serverErrorMessage}</p>;
    }
  };

  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          if (value.teamMembers) {
            return (
              <div>
                <header>
                  <h1>Manage Team</h1>
                </header>

                <form
                  onSubmit={e => {
                    //add player to team
                    e.preventDefault();
                    store
                      .addToTeam(
                        this.state.addPlayer,
                        value.teamInfo.teamcode,
                        "Member"
                      )
                      .then(response => {
                        console.log(response.error, "response.error in .then");
                        if (response.error) {
                          this.setState({
                            addPlayorError: true,
                            serverErrorMessage: response.error
                          });
                        } else
                          this.props.login(
                            value.userInfo.username,
                            value.teamInfo.teamcode,
                            "/manage"
                          );
                      });
                  }}
                >
                  <fieldset>
                    <legend htmlFor="addPlayer">
                      Add Player(must use player User Name):
                    </legend>
                    <label for="addPlayer">User Name:</label>
                    <input
                      required
                      type="text"
                      id="addPlayer"
                      onChange={e => {
                        this.setState({
                          addPlayer: e.target.value,
                          userNotFound: false,
                          addPlayorError: false
                        });
                      }}
                    ></input>
                    <label for="newRoleChange">Role:</label>
                    <select
                      required
                      id="newRoleChange"
                      onChange={e =>
                        this.setState({
                          newMemberRank: e.target.value
                        })
                      }
                    >
                      <option value=""></option>
                      <option value="Captain">Captain</option>
                      <option value="Reporter">Reporter</option>
                      <option value="Member">Member</option>
                      <option value="Guest">Guest</option>
                    </select>
                    {this.addUserErrorDisplay(this.state.addPlayorError)}
                    <button type="submit">Submit</button>
                  </fieldset>
                </form>
                {this.changeRole(value)}

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    store
                      .changeWinnings(
                        parseInt(this.state.winnings),
                        value.teamInfo.teamcode
                      )
                      .then(response => {
                        this.props.login(
                          value.userInfo.username,
                          value.teamInfo.teamcode,
                          "/manage"
                        );
                      });
                  }}
                >
                  <fieldset>
                    <legend htmlFor="winnings">Winnings</legend>

                    <input
                      required
                      type="number"
                      id="winnings"
                      placeholder={`Current: $${value.teamInfo.winnings}`}
                      onChange={e =>
                        this.setState({ winnings: e.target.value })
                      }
                    ></input>
                    <button type="submit">Submit</button>
                  </fieldset>
                </form>

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    store
                      .changeTeamName(
                        this.state.newName,
                        value.teamInfo.teamcode
                      )
                      .then(response => {
                        this.props.login(value.user);
                      });
                  }}
                >
                  <fieldset>
                    <legend htmlFor="teamName">Team Name:</legend>
                    <input
                      required
                      id="teamName"
                      type="text"
                      placeholder={value.teamInfo.teamname}
                      onChange={e => this.setState({ newName: e.target.value })}
                    ></input>
                    <button type="submit">Submit</button>
                  </fieldset>
                </form>
                <button
                  type="button"
                  onClick={() => this.props.history.push("/home")}
                >
                  Cancel
                </button>
              </div>
            );
          }
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(ManageTeam);
