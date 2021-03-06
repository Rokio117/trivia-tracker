import React, { Component } from "react";
import RegisterTeam from "../../forms/registerTeam/registerTeam";
import store from "../../../store";
import { withRouter } from "react-router-dom";
import "./noTeamPage.css";
import TriviaContext from "../../../context";
import { loader } from "../../loader";
//page user is taken to upon logging in or registering where if they are not on a team
class NoTeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamCode: "",
      noTeamFound: false,
      loading: false
    };
  }

  noTeamFound = error => {
    if (error) {
      return <p className="error">Team not found</p>;
    }
  };

  setLoading = () => {
    this.state.loading
      ? this.setState({ loading: false })
      : this.setState({ loading: true });
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          return (
            <div>
              {loader.displayLoading(this.state.loading)}
              <header>
                <h1>Home</h1>
              </header>
              <p id="noTeamParagraph">
                It looks like you don't have a team! You can register your team,
                or if your team is already registered get their code to be
                added!
              </p>
              <fieldset id="noTeamSignInForm">
                <h2>Sign In:</h2>
                <label htmlFor="teamForm">Team User Name: </label>
                <form
                  id="teamForm"
                  onSubmit={e => {
                    e.preventDefault();
                    this.setLoading();
                    store
                      .addToTeam(value.user, this.state.teamCode, "Member")
                      .then(response => {
                        if (response.message) {
                          this.setLoading();
                          this.props.history.push("/error");
                        } else if (!response.error) {
                          this.setLoading();
                          this.props.login(value.user);
                        } else {
                          this.setLoading();
                          this.setState({ noTeamFound: true });
                        }
                      });
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
                  <button type="submit" id="noTeamPageSubmitButton">
                    Submit
                  </button>
                </form>
              </fieldset>
              <RegisterTeam
                loginUser={this.props.loginUser}
                loginTeam={this.props.loginTeam}
              />
              <button
                id="noTeamPageLogOutButton"
                onClick={e => {
                  e.preventDefault();
                  this.props.logout();
                }}
              >
                Log out
              </button>
            </div>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}
export default withRouter(NoTeamPage);
