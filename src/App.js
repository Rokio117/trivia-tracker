import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import CreateEvent from "../src/components/forms/createEvent/createEvent";
import PickTeam from "./components/forms/pickTeam/pickTeam";
import RegisterTeam from "./components/forms/registerTeam/registerTeam";
import Settings from "./components/forms/settings/settings";
import ErrorDisplay from "./components/homePage/ErrorDisplay/errorDisplay";
import Home from "./components/homePage/home/home";
import NoTeamPage from "./components/homePage/noTeamPage/noTeamPage";
import WelcomePage from "./components/welcomePage/welcomePage";
import ManageTeam from "./components/forms/manageTeam/manageTeam";
import TriviaContext from "./context";

import { Route, Switch } from "react-router-dom";
import "./App.css";
import store from "./store";
import { tokenFunctions } from "./tokenService";

export const APP_STATE_KEY = "appState";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      userTeams: [],
      userInfo: {},
      teamInfo: {},
      teamMembers: [],
      loggedIn: false,
      loading: false
    };
  }

  handlePageReload = endpoint => {
    const sessionInfo = JSON.parse(sessionStorage.getItem("state"));

    if (!this.state.loggedIn) {
      if (sessionInfo) {
        this.setState(sessionInfo);
      }
    }
  };

  login = (username, teamCode, endpoint) => {
    //after the form validation, this function will set the user and team in state,
    //as well as fetching the user and team info and storing it in state

    store.getUser(username).then(userInfo => {
      if (userInfo.message) {
        this.props.history.push("/");
      }
      store
        .getTeamsForUser(username)
        .then(userTeams => {
          //if the member is already a part of a team
          let appState = {};

          if (userTeams.length > 0) {
            let teamInfo = userTeams[0];
            if (teamCode) {
              const teamIndex = userTeams.findIndex(team => {
                return team.teamcode === teamCode;
              });
              teamInfo = userTeams[teamIndex];
            }

            appState = {
              user: username,
              userInfo: userInfo[0],
              teamInfo: teamInfo,
              userTeams: userTeams,
              teamMembers: teamInfo.members,
              loggedIn: true
            };
          }
          if (userTeams.length === 0) {
            appState = {
              user: username,
              userInfo: userInfo[0],
              loggedIn: true
            };
          }

          return appState;
        })
        .then(appState => {
          let location = "/home";
          if (endpoint) {
            location = endpoint;
          }
          if (!appState.teamInfo) {
            location = "/noTeam";
          }

          this.setState(appState);
          //sets state in session storage to be retrieved upon page refresh or error
          sessionStorage.setItem("state", JSON.stringify(appState));
          this.props.history.push(location);
        });
    });
  };

  loginTeam = teamInfo => {
    const teamMembers = teamInfo.members;

    if (!this.state.userTeams.includes(teamInfo)) {
      const teamList = [...this.state.userTeams, teamInfo];
      this.setState({
        teamInfo: teamInfo,
        userTeams: teamList,
        teamMembers: teamMembers
      });
      this.props.history.push("/");
    } else this.setState({ teamInfo: teamInfo, teamMembers: teamMembers });

    this.props.history.push("/home");
  };

  changeTeam = teamCode => {
    const teamInfo = store.getTeam(teamCode);

    this.setState({ teamInfo: teamInfo, team: teamCode });
  };
  logout = () => {
    if (window.confirm("Are you sure?")) {
      this.setState({
        user: "",
        team: "",
        userInfo: "",
        teamInfo: "",
        loggedIn: false
      });
      tokenFunctions.clearAuthToken();
      sessionStorage.clear();
      this.props.history.push("/");
    }
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    return (
      <TriviaContext.Provider
        value={{
          userInfo: this.state.userInfo,
          teamInfo: this.state.teamInfo,
          userTeams: this.state.userTeams,
          teamMembers: this.state.teamMembers,
          user: this.state.user,
          team: this.state.team
        }}
      >
        <Switch>
          <Route
            exact
            path="/"
            component={props => {
              return (
                <WelcomePage loginTeam={this.loginTeam} login={this.login} />
              );
            }}
          ></Route>
          <Route
            path="/teamPick"
            component={props => {
              return (
                <PickTeam
                  loggedIn={this.state.loggedIn}
                  changeTeam={this.changeTeam}
                  loginTeam={this.loginTeam}
                  handlePageReload={this.handlePageReload}
                />
              );
            }}
          ></Route>
          <Route
            path="/manage"
            component={props => {
              return (
                <ManageTeam
                  login={this.login}
                  loginTeam={this.loginTeam}
                  handlePageReload={this.handlePageReload}
                />
              );
            }}
          ></Route>
          <Route
            path="/settings"
            component={props => {
              return (
                <Settings
                  login={this.login}
                  handlePageReload={this.handlePageReload}
                />
              );
            }}
          ></Route>
          <Route
            path="/addEvent"
            component={props => {
              return (
                <CreateEvent
                  handlePageReload={this.handlePageReload}
                  login={this.login}
                />
              );
            }}
          ></Route>
          <Route
            path="/new"
            component={props => {
              return (
                <RegisterTeam
                  loginUser={this.login}
                  loginTeam={this.loginTeam}
                  handlePageReload={this.handlePageReload}
                />
              );
            }}
          ></Route>
          <Route
            path="/home"
            component={props => {
              return (
                <Home
                  logout={this.logout}
                  handlePageReload={this.handlePageReload}
                />
              );
            }}
          ></Route>
          <Route
            path="/noTeam"
            component={props => {
              return (
                <NoTeamPage
                  login={this.login}
                  loginTeam={this.loginTeam}
                  loginUser={this.login}
                  logout={this.logout}
                />
              );
            }}
          ></Route>
          <Route
            path="/error"
            component={() => {
              return <ErrorDisplay login={this.login} />;
            }}
          ></Route>
        </Switch>
      </TriviaContext.Provider>
    );
  }
}

export default withRouter(App);
