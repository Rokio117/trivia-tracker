import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import store from "../../../store";
import TriviaContext from "../../../context";
import "./manageTeam.css";
import { loader } from "../../loader";
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
      playerCurrentRank: "",
      loading: false
    };
  }

  componentDidMount() {
    this.props.handlePageReload("/manage");
  }

  setLoading() {
    this.state.loading
      ? this.setState({ loading: false })
      : this.setState({ loading: true });
  }

  changeRole = value => {
    const noCaptains = value.teamMembers.filter(
      member => member.role !== "Captain"
    );
    if (noCaptains.length) {
      const options = noCaptains.map(member => {
        return (
          <option value={member.username} key={member.username}>
            {member.nickname}
          </option>
        );
      });
      return (
        <form
          id="changeRoleForm"
          onSubmit={e => {
            e.preventDefault();
            this.setLoading(); //loading is true
            store
              .changeRole(
                this.state.userToChange,
                this.state.newRank,
                value.teamInfo.teamcode
              )
              .then(res => {
                if (res.message) {
                  this.setLoading();
                  this.props.history.push("/error");
                } else if (res.error === "Unauthorized request ") {
                  this.setLoading();
                  this.props.history.push("/error");
                } else this.setLoading();
                this.props.login(
                  value.userInfo.username,
                  value.teamInfo.teamcode,
                  "/manage"
                );
              });
          }}
        >
          <fieldset id="changeRoleFieldset">
            <legend htmlFor="changeRole">Change Role</legend>
            <label htmlFor="teammateSelect">Player:</label>
            <select
              required
              id="teammateSelect"
              onChange={e => {
                if (e.target.value) {
                  const userCurrentRank = value.teamInfo.members.find(
                    member => {
                      return member.username === e.target.value;
                    }
                  ).role;

                  this.setState({
                    userToChange: e.target.value,
                    playerCurrentRank: userCurrentRank
                  });
                } else {
                  this.setState({
                    userToChange: "",
                    playerCurrentRank: ""
                  });
                }
              }}
            >
              <option value="" className="playerOption"></option>
              {options}
            </select>
            <label htmlFor="roleChange">Role:</label>
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
            <button className="manageTeamSubmitButton" type="submit">
              Submit
            </button>
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
                {loader.displayLoading(this.state.loading)}
                <header>
                  <h1>Manage Team</h1>
                </header>

                <form
                  id="addPlayerForm"
                  onSubmit={e => {
                    //add player to team
                    e.preventDefault();
                    this.setLoading(); //loading set to true
                    store
                      .addToTeam(
                        this.state.addPlayer,
                        value.teamInfo.teamcode,
                        this.state.newMemberRank
                      )
                      .then(response => {
                        if (response.message) {
                          this.setLoading();
                          this.props.history.push("/error");
                        } else if (response.error) {
                          this.setLoading();
                          this.setState({
                            addPlayorError: true,
                            serverErrorMessage: response.error
                          });
                        } else {
                          this.setLoading();
                          this.props.login(
                            value.userInfo.username,
                            value.teamInfo.teamcode,
                            "/manage"
                          );
                        }
                      });
                  }}
                >
                  <fieldset id="addPlayerFieldset">
                    <legend htmlFor="addPlayer">
                      Add Player(must use player User Name):
                    </legend>
                    <label htmlFor="addPlayer">User Name:</label>
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
                    <label htmlFor="newRoleChange">Role:</label>
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
                    <button className="manageTeamSubmitButton" type="submit">
                      Submit
                    </button>
                  </fieldset>
                </form>
                {this.changeRole(value)}

                <form
                  id="changeWinningsForm"
                  onSubmit={e => {
                    e.preventDefault();
                    this.setLoading(); //loading set to true
                    store
                      .changeWinnings(
                        parseInt(this.state.winnings),
                        value.teamInfo.teamcode
                      )
                      .then(response => {
                        if (response.message) {
                          this.setLoading();
                          this.props.history.push("/error");
                        } else if (response.error === "Unauthorized request ") {
                          this.setLoading();
                          this.props.history.push("/error");
                        } else this.setLoading();
                        this.props.login(
                          value.userInfo.username,
                          value.teamInfo.teamcode,
                          "/manage"
                        );
                      });
                  }}
                >
                  <fieldset id="changeWinningsFieldset">
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
                    <button className="manageTeamSubmitButton" type="submit">
                      Submit
                    </button>
                  </fieldset>
                </form>

                <form
                  id="changeTeamNameForm"
                  onSubmit={e => {
                    e.preventDefault();
                    this.setLoading(); //loading set to true
                    store
                      .changeTeamName(
                        this.state.newName,
                        value.teamInfo.teamcode
                      )
                      .then(response => {
                        if (response.message) {
                          this.setLoading();
                          this.props.history.push("/error");
                        } else if (response.error === "Unauthorized request ") {
                          this.setLoading();
                          this.props.history.push("/error");
                        } else this.props.login(value.user);
                      });
                  }}
                >
                  <fieldset id="changeTeamNameFieldset">
                    <legend htmlFor="teamName">Team Name:</legend>
                    <input
                      required
                      id="teamName"
                      type="text"
                      placeholder={value.teamInfo.teamname}
                      onChange={e => this.setState({ newName: e.target.value })}
                    ></input>
                    <button className="manageTeamSubmitButton" type="submit">
                      Submit
                    </button>
                  </fieldset>
                </form>
                <button
                  className="manageTeamSubmitButton"
                  id="goBackButton"
                  type="button"
                  onClick={() => this.props.history.push("/home")}
                >
                  Go Back
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
