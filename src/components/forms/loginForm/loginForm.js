import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./loginForm.css";
import STORE from "../../../store";
import store from "../../../store";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      loginPassword: "",
      loginError: false
    };
  }

  validateLogin = (userName, password) => {
    const user = store.getUser(userName);
    const userTeam = store.getTeamsForUser(userName);
    if (!user) {
      this.setState({ loginError: true });

      return false;
    } else if (user.password !== password) {
      this.setState({ loginError: true });

      return false;
    }

    this.setState({ loginError: false });
    this.props.loginUser(userName);
    this.props.history.push("/home");
    return true;
  };

  loginError = error => {
    if (error) {
      return <p className="error">Wrong User Name or Password</p>;
    }
  };

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
