import React, { Component } from "react";
import RegisterTeam from "../../forms/registerTeam/registerTeam";
import store from "../../../store";
import { withRouter } from "react-router-dom";
import "./noTeamPage.css";
import TriviaContext from "../../../context";
class NoTeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamCode: "",
      noTeamFound: false
    };
  }
  noTeamFound = error => {
    if (error) {
      return <p className="error">Team not found</p>;
    }
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          return (
            <div>
              <header>
                <h1>Home</h1>
              </header>
              <p>
                It looks like you don't have a team! You can register your team,
                or if your team is already registered get their code to be
                added!
              </p>
              <fieldset>
                <h2>Sign In:</h2>
                <label htmlFor="teamForm">Team User Name: </label>
                <form
                  id="teamForm"
                  onSubmit={e => {
                    e.preventDefault();
                    const teamCode = store.getTeam(this.state.teamCode);
                    if (!store.teamExists(this.state.teamCode)) {
                      this.setState({ noTeamFound: true });
                    } else {
                      store.addToTeam(
                        value.userInfo.username,
                        this.state.teamCode,
                        "Member"
                      );
                      this.props.loginTeam(teamCode);
                      this.props.history.push("home");
                    }
                  }}
                >
                  <input
                    type="text"
                    onChange={e =>
                      this.setState({
                        teamCode: e.target.value,
                        noTeamFound: false
                      })
                    }
                  ></input>
                  {this.noTeamFound(this.state.noTeamFound)}
                  <button type="submit">Submit</button>
                </form>
              </fieldset>
              <RegisterTeam
                loginUser={this.props.loginUser}
                loginTeam={this.props.loginTeam}
              />
            </div>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}
export default withRouter(NoTeamPage);
