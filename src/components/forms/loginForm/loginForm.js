import React, { Component } from "react";
import "./loginForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      loginPassword: ""
    };
  }
  render() {
    return (
      <div>
        <label htmlFor="login" className="formLabel">
          Already Signed up? Login
        </label>
        <form
          id="login"
          onSubmit={e => {
            e.preventDefault();
            console.log("login form onSubmit ran");
            this.props.validateUser(this.state.validateUser);
            this.props.validatePassword(this.state.loginPassword);
          }}
        >
          <label htmlFor="logName">User Name</label>
          <input
            id="logName"
            required
            onChange={e => {
              this.setState({ loginName: e.target.value });
            }}
          ></input>
          <label htmlFor="logPassword">Password</label>
          <input
            id="logPassword"
            required
            onChange={e => {
              this.setState({ loginPassword: e.target.value });
            }}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
