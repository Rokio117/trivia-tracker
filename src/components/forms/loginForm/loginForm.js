import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./loginForm.css";
import store from "../../../store";
import { tokenFunctions } from "../../../tokenService";
import { passwordHelper } from "../showPassword";
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      loginPassword: "",
      loginError: false,
      buttonOption: "show",
      connectionError: false,
      connectionMessage: ""
    };
  }

  validateLogin = (username, password) => {
    tokenFunctions.saveAuthToken(
      tokenFunctions.makeBasicAuthToken(username, password)
    );
    store.getUser(username).then(response => {
      console.log(response, "response after fetch in form");
      if (response.message) {
        this.setState({
          connectionError: true,
          connectionMessage: response.message
        });
      } else if (response.error) {
        this.setState({ loginError: true });
        console.log(response.error, "response.error in first if statement");
        return false;
      } else if (response[0].password !== password) {
        this.setState({ loginError: true });
        console.log("else if statement ran");
        return false;
      }
      if (response[0].id) {
        console.log("response.ok if block ran");
        this.setState({ loginError: false });
        this.props.loginUser(username);
        this.props.history.push("/home");
        return true;
      }
    });
  };

  loginError = error => {
    if (error) {
      return <p className="error">Wrong User Name or Password</p>;
    }
  };

  connectionError = (error, message) => {
    if (error) {
      return <p className="error">{message}</p>;
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
            type="password"
            id="logPassword"
            required
            onChange={e => {
              this.setState({ loginPassword: e.target.value });
            }}
          ></input>
          <button
            id="logPwShowOrHide"
            onClick={e => {
              e.preventDefault();
              passwordHelper.showPassword("logPassword", "logPwShowOrHide");
              if (this.state.buttonOption === "show") {
                this.setState({ buttonOption: "hide" });
              } else this.setState({ buttonOption: "show" });
            }}
            value="show"
          >
            {this.state.buttonOption}
          </button>
          {this.loginError(this.state.loginError)}
          {this.connectionError(
            this.state.connectionError,
            this.state.connectionMessage
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
