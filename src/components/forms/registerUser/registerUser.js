import React, { Component } from "react";
import "./registerUser.css";
import store from "../../../store";

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpusername: "",
      signUpName: "",
      signUpPassword: "",
      signUpRepeatPassword: "",
      teamusername: "",
      passwordMatch: true,
      uniqueusername: true,
      noTeamFound: false
    };
  }

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
      <div id="registerForm">
        <label htmlFor="signUp" className="formLabel">
          New? Sign Up
        </label>
        <form
          id="signUp"
          onSubmit={e => {
            const teamChanged = this.state.teamusername !== "";
            const match =
              this.state.signUpPassword === this.state.signUpRepeatPassword;
            const unique = !store.users
              .map(user => user.username)
              .includes(this.state.signUpusername);
            let realTeam;

            if (teamChanged) {
              realTeam = store.teams
                .map(team => team.teamCode)
                .includes(this.state.teamusername);
            }
            const validTeam = teamChanged && realTeam;
            e.preventDefault();
            if (!match) {
              this.setState({ passwordMatch: false });
            }
            if (!unique) {
              this.setState({ uniqueusername: false });
            }
            if (teamChanged && !realTeam) {
              this.setState({ noTeamFound: true });
            }
            if (match && unique && (validTeam || teamChanged === false)) {
              const newUser = {
                username: this.state.signUpusername,
                name: this.state.signUpName,
                password: this.state.signUpPassword
              };
              //push new user into the array on store. this will become a post request
              if (validTeam) {
                store.postUserWithTeam(newUser, this.state.teamusername);
                this.props.login(newUser.username);
              }
              store.postUserWithNoTeam(newUser);

              this.props.loginUser(this.state.signUpusername);
            }
          }}
        >
          <label htmlFor="username">User Name:</label>
          <input
            id="username"
            type="text"
            required
            onChange={e =>
              this.setState({
                signUpusername: e.target.value,
                uniqueusername: true
              })
            }
          ></input>
          {this.mustBeUnique(this.state.uniqueusername)}
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
            onChange={e =>
              this.setState({
                signUpPassword: e.target.value,
                passwordMatch: true
              })
            }
          ></input>
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            id="repeatPassword"
            type="text"
            required
            onChange={e =>
              this.setState({
                signUpRepeatPassword: e.target.value,
                passwordMatch: true
              })
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
            onChange={e =>
              this.setState({
                teamusername: e.target.value,
                noTeamFound: false
              })
            }
          ></input>
          {this.noTeamFound(this.state.noTeamFound)}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default RegisterUser;
