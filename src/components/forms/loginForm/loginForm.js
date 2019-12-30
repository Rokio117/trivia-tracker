import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./loginForm.css";
import STORE from "../../../store";
import store from "../../../store";
import { tokenFunctions } from "../../../tokenService";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      loginPassword: "",
      loginError: false
    };
  }

  validateLogin = (username, password) => {
    tokenFunctions.saveAuthToken(
      tokenFunctions.makeBasicAuthToken(username, password)
    );
    store.getUser(username).then(response => {
      if (response.error) {
        this.setState({ loginError: true });

        return false;
      } else if (response[0].password !== password) {
        this.setState({ loginError: true });

        return false;
      }

      this.setState({ loginError: false });
      this.props.loginUser(username);
      this.props.history.push("/home");
      return true;
    });
  };

  loginError = error => {
    if (error) {
      return <p className="error">Wrong User Name or Password</p>;
    }
  };

  render() {
    return (
      <div id="loginForm">
        <label htmlFor="login" className="formLabel">
          Already Signed up? Login
        </label>
        <form
          id="login"
          onSubmit={e => {
            e.preventDefault();

            this.validateLogin(this.state.loginName, this.state.loginPassword);
          }}
        >
          <label htmlFor="logName">User Name</label>
          <input
            id="logName"
            required
            onChange={e => {
              this.setState({ loginName: e.target.value, loginError: false });
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
          {this.loginError(this.state.loginError)}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
