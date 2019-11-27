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
      noChangeRank: false
    };
  }

  changeRole = members => {
    const noCaptains = members.filter(member => member.role !== "Captain");
    if (noCaptains.length) {
      const options = noCaptains.map(member => {
        return <option value={member.userName}>{member.name}</option>;
      });
      return (
        <form>
          <fieldset>
            <legend htmlFor="changeRole">Change Role</legend>
            <label for="teammateSelect">Player:</label>
            <select
              required
              id="teammateSelect"
              onChange={e => this.setState({ userToChange: e.target.value })}
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
              <option value=""></option>
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
  noUser = error => {
    //this should be the smart part that returns the error string or object
    //move checking functionality outside of on submit
    if (error) {
      return <p className="error">User Name doesn't exist</p>;
    }
  };
  alreadyOnTeam = duplicate => {
    if (duplicate) {
      return <p className="error">User is already on team</p>;
    }
  };
  validateUser = user => {
    return store.userExists(user);
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
                    e.preventDefault();
                    if (!this.validateUser(this.state.addPlayer)) {
                      this.setState({ userNotFound: true });
                    } else {
                      store.addToTeam(
                        this.state.addPlayer,
                        value.teamInfo.teamCode,
                        this.state.newMemberRank
                      );
                      this.props.history.push("/home");
                    }
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
                        const duplicate = value.teamMembers
                          .map(member =>
                            Object.values(member).includes(e.target.value)
                          )
                          .includes(true);
                        this.setState({
                          addPlayer: e.target.value,
                          userNotFound: false,
                          duplicateUser: duplicate
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
                    {this.noUser(this.state.userNotFound)}
                    {this.alreadyOnTeam(this.state.duplicateUser)}
                    <button type="submit">Submit</button>
                  </fieldset>
                </form>
                {this.changeRole(value.teamMembers)}

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    store.changeWinnings(
                      this.state.winnings,
                      value.teamInfo.teamCode
                    );
                    this.props.history.push("/home");
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
                    store.changeTeamName(
                      this.state.newName,
                      value.teamInfo.teamCode
                    );
                    this.props.history.push("/home");
                  }}
                >
                  <fieldset>
                    <legend htmlFor="teamName">Team Name:</legend>
                    <input
                      required
                      id="teamName"
                      type="text"
                      placeholder={value.teamInfo.name}
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
          } else this.props.history.push("/");
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(ManageTeam);
