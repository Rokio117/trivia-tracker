import React, { Component } from "react";
import "./registerUser.css";
import store from "../../../store";

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpUserName: "",
      signUpName: "",
      signUpPassword: "",
      signUpRepeatPassword: "",
      teamUserName: "",
      passwordMatch: true,
      uniqueUserName: true,
      noTeamFound: false
    };
  }
  // validatePassword = (password, repeatPassword, userName) => {
  //   console.log(password, repeatPassword);
  //   const users = store.users.map(user => user.userName);
  //   const match = password === repeatPassword;
  //   const unique = !store.users.map(user => user.userName).includes(userName);
  //   if (match) {
  //     this.setState({ passwordMatch: true });
  //   }setState
  //   if (unique) {
  //     this.setState({ uniqueUserName: true });
  //   }
  //   console.log("users", users, "match", match, "unique", unique);
  // };
  mustRepeat = match => {
    if (!match) {
      return <p className="error">Passwords must match</p>;
    }
  };
  mustBeUnique = unique => {
    if (!unique) {
      return <p className="error">User Name Is Taken</p>;
    }
  };
  noTeamFound = team => {
    if (team) {
      return <p className="error">Team Not Found</p>;
    }
  };
  render() {
    return (
      <div>
        <label htmlFor="signUp" className="formLabel">
          New? Sign Up
        </label>
        <form
          id="signUp"
          onSubmit={e => {
            const teamChanged = this.state.teamUserName !== "";
            const match =
              this.state.signUpPassword === this.state.signUpRepeatPassword;
            const unique = !store.users
              .map(user => user.userName)
              .includes(this.state.signUpUserName);
            let realTeam;

            if (teamChanged) {
              realTeam = store.teams
                .map(team => team.teamCode)
                .includes(this.state.teamUserName);
            }
            const validTeam = teamChanged && realTeam;
            console.log(realTeam, "realteam");
            e.preventDefault();
            if (!match) {
              this.setState({ passwordMatch: false });
            }
            if (!unique) {
              this.setState({ uniqueUserName: false });
            }
            if (!realTeam) {
              this.setState({ noTeamFound: true });
            }
            if (match && unique && (validTeam || teamChanged === false)) {
              console.log("validated");
              const teams = [{ teamCode: this.state.teamUserName }];
              const newUser = {
                userName: this.state.signUpUserName,
                name: this.state.signUpName,
                teams: teams,
                password: this.state.signUpPassword
              };
              //push new user into the array on store. this will become a post request
              store.users.push(newUser);
              console.log("users after add new", store.users);
              this.props.loginUser(this.state.signUpUserName);
            }
            console.log(this.state, "state after validatePassword");
          }}
        >
          <label htmlFor="userName">User Name:</label>
          <input
            id="userName"
            type="text"
            required
            onChange={e => this.setState({ signUpUserName: e.target.value })}
          ></input>
          {this.mustBeUnique(this.state.uniqueUserName)}
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            required
            onChange={e => this.setState({ signUpName: e.target.value })}
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="text"
            required
            onChange={e => this.setState({ signUpPassword: e.target.value })}
          ></input>
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            id="repeatPassword"
            type="text"
            required
            onChange={e =>
              this.setState({ signUpRepeatPassword: e.target.value })
            }
          ></input>
          {this.mustRepeat(this.state.passwordMatch)}
          <label htmlFor="teamCode">
            Team User Name (if your team is already registered type it's User
            Name here)
          </label>
          <input
            defaultValue=""
            id="teamCode"
            type="text"
            onChange={e => this.setState({ teamUserName: e.target.value })}
          ></input>
          {this.noTeamFound(this.state.noTeamFound)}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default RegisterUser;
