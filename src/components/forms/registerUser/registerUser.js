import React, { Component } from "react";
import "./registerUser.css";
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpUserName: "",
      signUpName: "",
      signUpPassword: "",
      signUpRepeatPassword: "",
      teamCode: ""
    };
  }
  render() {
    return (
      <div>
        <label htmlFor="signUp" className="formLabel">
          New? Sign Up
        </label>
        <form id="signUp">
          <label htmlFor="userName">User Name:</label>
          <input id="userName" type="text" required></input>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" required></input>
          <label htmlFor="password">Password:</label>
          <input id="password" type="text" required></input>
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input id="repeatPassword" type="text" required></input>
          <label htmlFor="teamCode">
            Team Code (if your team is already registered type your code here)
          </label>
          <input id="teamCode" type="text"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default RegisterUser;
