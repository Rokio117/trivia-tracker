import React, { Component } from "react";
import "./loginForm.css";
class LoginForm extends Component {
  render() {
    return (
      <div>
        <label htmlFor="login" class="formLabel">
          Already Signed up? Login
        </label>
        <form id="login">
          <label htmlFor="logName">Name</label>
          <input id="logName" required></input>
          <label htmlFor="logPassword">Password</label>
          <input id="logPassword" required></input>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
