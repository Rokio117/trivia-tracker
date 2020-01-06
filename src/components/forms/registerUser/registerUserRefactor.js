import React, { Component } from "react";
import "./registerUser.css";
import store from "../../../store";
import { tokenFunctions } from "../../../tokenService";
import { passwordHelper } from "../showPassword";
class RegisterUserRefactor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpusername: "",
      signUpName: "",
      signUpPassword: "",
      signUpRepeatPassword: "",
      teamusername: undefined,
      passwordMatch: true,
      uniqueusername: true,
      noTeamFound: false,
      buttonOption: "show",
      connectionError: "",
      connectionMessage: "",
      extended: false
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
  connectionError = (error, message) => {
    if (error) {
      return <p className="error">{message}</p>;
    }
  };

  smallRegisterForm(registerFormId) {
    if (!this.state.extended) {
      return (
        <div
          id="smallRegisterForm"
          onClick={e => {
            this.state.extended
              ? this.setState({ extended: false })
              : this.setState({ extended: true });
          }}
        >
          <label htmlFor="signUp" className="formLabel">
            New? <span className="smallFormChoice">Sign up</span>
          </label>
        </div>
      );
    } else return this.fullRegisterForm(registerFormId);
  }

  fullRegisterForm(registerFormId, message) {
    return (
      <div id={`${registerFormId}`}>
        <label htmlFor="signUp" className="formLabel">
          {message}
          <span
            className="smallFormChoice"
            onClick={e => this.setState({ extended: false })}
          >
            {` Sign up`}
          </span>
        </label>
        <form
          id="signUp"
          onSubmit={e => {
            e.preventDefault();
            this.props.setLoading();
            if (this.state.signUpPassword !== this.state.signUpRepeatPassword) {
              this.props.setLoading();
              this.setState({ passwordMatch: false });
            } else {
              store.userExists(this.state.signUpusername).then(userId => {
                if (userId.message) {
                  this.props.setLoading();
                  this.setState({
                    connectionError: true,
                    connectionMessage: userId.message
                  });
                }
                if (userId.length) {
                  this.props.setLoading();
                  this.setState({ uniqueusername: false });
                } else {
                  const newUser = {
                    username: this.state.signUpusername,
                    nickname: this.state.signUpName,
                    password: this.state.signUpPassword
                  };
                  if (this.state.teamusername) {
                    store.teamExists(this.state.teamusername).then(teamId => {
                      if (!teamId.length) {
                        this.props.setLoading();
                        this.setState({ noTeamFound: true });
                      } else {
                        store
                          .postUserWithTeam(newUser, this.state.teamusername)
                          .then(response => {
                            tokenFunctions.saveAuthToken(
                              tokenFunctions.makeBasicAuthToken(
                                newUser.username,
                                newUser.password
                              )
                            );
                            this.props.setLoading();
                            this.props.login(newUser.username);
                          });
                      }
                    });
                  } else {
                    store.postUserWithNoTeam(newUser).then(response => {
                      tokenFunctions.saveAuthToken(
                        tokenFunctions.makeBasicAuthToken(
                          newUser.username,
                          newUser.password
                        )
                      );
                      this.props.setLoading();
                      this.props.login(newUser.username);
                    });
                  }
                }
              });
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
            className="pwAndRepeatePw"
            type="password"
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
            className="pwAndRepeatePw"
            type="password"
            required
            onChange={e =>
              this.setState({
                signUpRepeatPassword: e.target.value,
                passwordMatch: true
              })
            }
          ></input>
          {this.mustRepeat(this.state.passwordMatch)}
          <button
            className="showPasswordsButton"
            onClick={e => {
              e.preventDefault();
              passwordHelper.showPasswords("pwAndRepeatePw");
              if (this.state.buttonOption === "show") {
                this.setState({ buttonOption: "hide" });
              } else {
                this.setState({ buttonOption: "show" });
              }
            }}
          >
            {this.state.buttonOption}
          </button>
          {this.connectionError(
            this.state.connectionError,
            this.state.connectionMessage
          )}
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
          <button type="submit" className="loginButton">
            Submit
          </button>
        </form>
      </div>
    );
  }
  render() {
    return (
      <>
        {this.smallRegisterForm("displayedRegisterForm")}
        {this.fullRegisterForm("registerForm", "New?")}
      </>
    );
  }
}
export default RegisterUserRefactor;
