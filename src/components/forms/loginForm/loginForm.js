import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./loginForm.css";
import store from "../../../store";
import { tokenFunctions } from "../../../tokenService";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      loginPassword: "",
      loginError: false,
      connectionError: false,
      connectionMessage: "",
      extended: false
    };
  }

  validateLogin = (username, password) => {
    this.props.setLoading();

    tokenFunctions.saveAuthToken(
      tokenFunctions.makeBasicAuthToken(username, password)
    );
    store.getUser(username).then(response => {
      if (response.message) {
        this.props.setLoading();
        this.setState({
          connectionError: true,
          connectionMessage: response.message
        });
      } else if (response.error) {
        this.props.setLoading();
        this.setState({ loginError: true });

        return false;
      } else if (response[0].password !== password) {
        this.props.setLoading();
        this.setState({ loginError: true });

        return false;
      }
      if (response[0].id) {
        this.props.setLoading();
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

  fullLoginMenu(message, id) {
    return (
      <>
        <div id={`${id}`}>
          <label
            htmlFor="login"
            className="formLabel"
            onClick={e => this.setState({ extended: false })}
          >
            {message}
            <span className="smallFormChoice">Login</span>
          </label>
          <form
            id="login"
            onSubmit={e => {
              e.preventDefault();

              this.validateLogin(
                this.state.loginName,
                this.state.loginPassword
              );
            }}
          >
            <label htmlFor="logName">User Name</label>
            <input
              id="logName"
              required
              onChange={e => {
                this.setState({
                  loginName: e.target.value,
                  loginError: false
                });
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

            {this.loginError(this.state.loginError)}
            {this.connectionError(
              this.state.connectionError,
              this.state.connectionMessage
            )}
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
        </div>
      </>
    );
  }

  smallLoginMenu(id) {
    if (!this.state.extended) {
      return (
        <div
          id="smallLoginForm"
          onClick={e => {
            this.state.extended
              ? this.setState({ extended: false })
              : this.setState({ extended: true });
          }}
        >
          <label htmlFor="login" className="formLabel">
            Already Signed up? <span className="smallFormChoice">Login</span>
          </label>
        </div>
      );
    } else return this.fullLoginMenu("", "smallLoginForm");
  }

  render() {
    return (
      <>
        {this.smallLoginMenu()}
        {this.fullLoginMenu("Already signed up?", "loginForm")}
      </>
    );
  }
}

export default withRouter(LoginForm);
