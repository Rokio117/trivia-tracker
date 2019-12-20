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
    //where is members coming from?
    //value.teamMembers

    const noCaptains = members.filter(member => member.role !== "Captain");

    if (noCaptains.length) {
      const options = noCaptains.map(member => {
        return <option value={member.username}>{member.nickname}</option>;
      });
      return (
        <>
          <label htmlFor="changeRole">Change Role</label>
          <select
            id="teammateSelect"
            onChange={e => this.setState({ userToChange: e.target.value })}
          >
            <option value="none">Player:</option>
            {options}
          </select>
          <select
            id="roleChange"
            onChange={e => this.setState({ newRank: e.target.value })}
          >
            <option>Role:</option>
            <option value="Captain">Captain</option>
            <option value="Reporter">Reporter</option>
            <option value="Member">Member</option>
            <option value="Guest">Guest</option>
          </select>
        </>
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
  noNewRank = error => {
    if (error) {
      return <p className="error">Select a rank</p>;
    }
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          return (
            <div>
              <header>
                <h1>Manage Team</h1>
              </header>
              <fieldset>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    //pass into a validate fields function that can validate other fields within it
                    //no function should be bigger thatn your whole screen
                    const userToChanged = this.state.addPlayer ? true : false;
                    const newMember = this.state.addPlayer;
                    const realMember = store.userExists(newMember);
                    const team = value.teamInfo.teamCode;
                    let userNotFound = false;
                    let noNewRank = false;
                    let noChangeRank = false;

                    if (this.state.addPlayer && !realMember) {
                      //if a player has been selected, but not found
                      userNotFound = true;
                      this.setState({ userNotFound: true });
                    }
                    // if (duplicate) {
                    //   //if the user is already on the team
                    //   this.setState({ duplicateUser: true });
                    // }
                    if (
                      !this.state.duplicateUser &&
                      userToChanged &&
                      realMember &&
                      !this.state.newMemberRank
                    ) {
                      //if a user has been entered, isn't on the team, is real, but no rank is selected
                      noNewRank = true;
                      this.setState({ noNewRank: true });
                    }
                    if (this.state.userToChange && !this.state.newRank) {
                      //if a user has been selected but a rank hasn't
                      noChangeRank = true;
                      this.setState({ noChangeRank: true });
                    }

                    //store functions
                    if (
                      !userNotFound &&
                      !noNewRank &&
                      !noChangeRank &&
                      !this.state.duplicateUser
                    ) {
                      if (
                        userToChanged &&
                        !this.state.duplicateUser &&
                        realMember &&
                        this.state.newMemberRank
                      ) {
                        store.addToTeam(
                          newMember,
                          team,
                          this.state.newMemberRank
                        );
                      }
                      if (this.state.userToChange && this.state.newRank) {
                        store.changeRole(
                          this.state.userToChange,
                          this.state.newRank,
                          team
                        );
                      }
                      if (this.state.winnings) {
                        store.changeWinnings(this.state.winnings, team);
                      }
                      if (this.state.newName) {
                        store.changeTeamName(this.state.newName, team);
                      }
                      this.props.loginTeam(value.teamInfo);
                    }
                  }}
                >
                  <label htmlFor="addPlayer">
                    Add Player(must use player User Name):
                  </label>
                  <input
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
                  <select
                    id="newRoleChange"
                    onChange={e =>
                      this.setState({
                        newMemberRank: e.target.value,
                        noNewRank: false
                      })
                    }
                  >
                    <option value="none">Role:</option>
                    <option value="Captain">Captain</option>
                    <option value="Reporter">Reporter</option>
                    <option value="Member">Member</option>
                    <option value="Guest">Guest</option>
                  </select>
                  {this.noUser(this.state.userNotFound)}
                  {this.alreadyOnTeam(this.state.duplicateUser)}
                  {this.noNewRank(this.state.noNewRank)}
                  <br></br>
                  {this.changeRole(value.teamMembers)}
                  {this.noNewRank(this.state.noChangeRank)}
                  <br></br>
                  <label htmlFor="winnings">Winnings $</label>
                  <input
                    type="number"
                    id="winnings"
                    placeholder={value.teamInfo.winnings}
                    onChange={e => this.setState({ winnings: e.target.value })}
                  ></input>
                  <br></br>
                  <label htmlFor="teamName">Team Name:</label>
                  <input
                    id="teamName"
                    type="text"
                    placeholder={value.teamInfo.name}
                    onChange={e => this.setState({ newName: e.target.value })}
                  ></input>
                  <br></br>
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
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(ManageTeam);
