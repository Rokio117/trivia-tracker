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
      uniqueUserName: true
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
  render() {
    return (
      <div>
        <label htmlFor="signUp" className="formLabel">
          New? Sign Up
        </label>
        <form
          id="signUp"
          onSubmit={e => {
            const match =
              this.state.signUpPassword === this.state.signUpRepeatPassword;
            const unique = !store.users
              .map(user => user.userName)
              .includes(this.state.signUpUserName);

            e.preventDefault();
            if (!match) {
              this.setState({ passwordMatch: false });
            }
            if (!unique) {
              this.setState({ uniqueUserName: false });
            }
            if (match && unique) {
              console.log("validated");
              const newUser = {
                userName: this.state.signUpUserName,
                name: this.state.signUpName,
                teams: [this.state.teamUserName],
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
            id="teamCode"
            type="text"
            onChange={e => this.setState({ teamUserName: e.target.value })}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default RegisterUser;
