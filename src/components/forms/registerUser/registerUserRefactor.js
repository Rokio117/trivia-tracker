import React, { Component } from "react";
import "./registerUser.css";
import store from "../../../store";
import { tokenFunctions } from "../../../tokenService";
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
      noTeamFound: false
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
  render() {
    return (
      <div id="registerForm">
        <label htmlFor="signUp" className="formLabel">
          New? Sign Up
        </label>
        <form
          id="signUp"
          onSubmit={e => {
            e.preventDefault();
            if (this.state.signUpPassword !== this.state.signUpRepeatPassword) {
              this.setState({ passwordMatch: false });
            } else {
              console.log("else statement of registerOnSubmit ran");
              store.userExists(this.state.signUpusername).then(userId => {
                if (userId.length) {
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
                            console.log(
                              response,
                              "response after store.post user with team"
                            );
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
                      console.log(
                        response,
                        "response after post user with no team"
                      );
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
            type="text"
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
            type="text"
            required
            onChange={e =>
              this.setState({
                signUpRepeatPassword: e.target.value,
                passwordMatch: true
              })
            }
          ></input>
          {this.mustRepeat(this.state.passwordMatch)}
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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default RegisterUserRefactor;
