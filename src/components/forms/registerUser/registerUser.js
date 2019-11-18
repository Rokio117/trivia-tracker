import React, { Component } from "react";
import "./registerUser.css";
import store from "../../../store";
import { tsImportEqualsDeclaration } from "@babel/types";
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpUserName: "",
      uniqueUserName: true,
      signUpName: "",
      signUpPassword: "",
      signUpRepeatPassword: "",
      passwordMatch: true,
      validatedPassword: "",
      teamUserName: ""
    };
  }
  validatePassword = (password, repeatPassword, userName) => {
    const users = store.users.map(user => user.userName);

    if (password !== repeatPassword) {
      return this.setState({ passwordMatch: false });
    }
    if (users.includes(userName)) {
      // turn this into a fetch request to compare users
      this.setState({ passwordMatch: false });
    }
    this.setState({ validatePassword: password });
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
            e.preventDefault();
            this.validatePassword(
              this.state.signUpPassword,
              this.state.signUpRepeatPassword,
              this.state.signUpUserName
            );
            if (this.state.passwordMatch && this.state.uniqueUserName) {
              const newUser = {
                userName: this.state.signUpUserName,
                name: this.state.signUpName,
                teams: [this.state.teamUserName],
                password: this.state.validatedPassword
              };
              //push new user into the array on store. this will become a post request
              store.users.push(newUser);
              this.props.loginUser(this.state.signUpUserName);
            }
          }}
        >
          <label htmlFor="userName">User Name:</label>
          <input
            id="userName"
            type="text"
            required
            onChange={e => this.setState({ teamUserName: e.target.value })}
          ></input>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" required></input>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="text"
            required
            onChange={e => this.setState({ signUpName: e.target.value })}
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
