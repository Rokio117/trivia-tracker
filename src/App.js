import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import CreateEvent from "../src/components/forms/createEvent/createEvent";

//import ManageTeam from "./components/forms/manageTeam/manageTeam";
import PickTeam from "./components/forms/pickTeam/pickTeam";
import RegisterTeam from "./components/forms/registerTeam/registerTeam";

import Settings from "./components/forms/settings/settings";

import Home from "./components/homePage/home/home";

import NoTeamPage from "./components/homePage/noTeamPage/noTeamPage";

import WelcomePage from "./components/welcomePage/welcomePage";

import TriviaContext from "./context";
import ManageTeam from "../src/components/forms/manageTeam/manageTeamRefactor";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import store from "./store";

export const APP_STATE_KEY = "appState";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userTeams: [],
      userInfo: "",
      teamInfo: "",
      teamMembers: "",
      loggedIn: false
    };
  }

  login = userName => {
    console.log("logged in");
    //after the form validation, this function will set the user and team in state,
    //as well as fetching the user and team info and storing it in state

    const userInfo = store.getUser(userName);
    const userTeams = store.getTeamsForUser(userName);
    console.log(userInfo, "userInfo", userTeams, "userTeams");
    //if the member is already a part of a team
    if (userTeams.length) {
      const teamCode = userTeams[0].teamCode;
      const teamInfo = store.getTeam(teamCode);

      const teamMembers = store.getNamedMembersOfTeam(teamInfo.members);
      //add logic for non-duplicates

      const appState = {
        user: userName,
        userInfo: userInfo,
        teamInfo: teamInfo,
        userTeams: userTeams,
        teamMembers: teamMembers,
        loggedIn: true
      };

      this.setState(appState);
      //revisit persist for server side
      //localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));

      this.props.history.push("/home");
    }
    //if the member does not have a team
    if (!userTeams.length) {
      this.setState({ user: userName, userInfo: userInfo });
      this.props.history.push("/noTeam");
    }
  };

  loginTeam = teamInfo => {
    const teamMembers = teamInfo.members.map(member =>
      Object.assign(member, {
        name: store.getNameFromUserName(member.userName)
      })
    );
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
      this.props.history.push("/");
    }
  };

  render() {
    console.log(this.state, "this.state in render");
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
                <WelcomePage
                  loginUser={this.login}
                  loginTeam={this.loginTeam}
                  login={this.login}
                />
              );
            }}
          ></Route>
          <Route
            path="/teamPick"
            component={props => {
              return (
                <PickTeam
                  changeTeam={this.changeTeam}
                  loginTeam={this.loginTeam}
                />
              );
            }}
          ></Route>
          <Route
            path="/manage"
            component={props => {
              return (
                <ManageTeam login={this.login} loginTeam={this.loginTeam} />
              );
            }}
          ></Route>
          <Route
            path="/settings"
            component={props => {
              return <Settings login={this.login} />;
            }}
          ></Route>
          <Route path="/addEvent" component={CreateEvent}></Route>
          <Route
            path="/new"
            component={props => {
              return (
                <RegisterTeam
                  loginUser={this.login}
                  loginTeam={this.loginTeam}
                />
              );
            }}
          ></Route>
          <Route
            path="/home"
            component={props => {
              return <Home logout={this.logout} />;
            }}
          ></Route>
          <Route
            path="/noTeam"
            component={props => {
              return (
                <NoTeamPage loginUser={this.login} loginTeam={this.loginTeam} />
              );
            }}
          ></Route>
        </Switch>
        {() => this.autoLogOut(this.state.loggedIn)}
      </TriviaContext.Provider>
    );
  }
}

export default withRouter(App);
