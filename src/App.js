import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import CreateEvent from "../src/components/forms/createEvent/createEvent";
import LoginForm from "./components/forms/loginForm/loginForm";
import ManageTeam from "./components/forms/manageTeam/manageTeam";
import PickTeam from "./components/forms/pickTeam/pickTeam";
import RegisterTeam from "./components/forms/registerTeam/registerTeam";
import RegisterUser from "./components/forms/registerUser/registerUser";
import Settings from "./components/forms/settings/settings";

import Home from "./components/homePage/home/home";
import NavBar from "./components/homePage/navBar/navBar";
import NoTeamPage from "./components/homePage/noTeamPage/noTeamPage";
import Roster from "./components/homePage/roster/roster";
import Standings from "./components/homePage/standings/standings";
import WelcomePage from "./components/welcomePage/welcomePage";

import STORE from "./store";
import TriviaContext from "./context";

import { Route, Switch } from "react-router-dom";
import "./App.css";
import store from "./store";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Rokio",
      team: "We'll Win Again Someday",
      userInfo: store.users[0],
      teamInfo: store.teams[0]
    };
  }

  loginUser = userName => {
    console.log("login ran");
    //after the form validation, this function will set the user and team in state,
    //as well as fetching the user and team info and storing it in state

    const userInfo = store.users.find(user => user.userName === userName);
    //if the member is already a part of a team
    if (userInfo.teams[0].teamCode) {
      console.log("on a team");
      const teamCode = userInfo.teams[0].teamCode;
      const teamInfo = store.teams.find(team => team.teamCode === teamCode);
      this.setState({ user: userName, userInfo: userInfo, teamInfo: teamInfo });
    }
    //if the member does not have a team
    if (!userInfo.teams[0].teamCode) {
      console.log("no team");
      this.setState({ user: userName, userInfo: userInfo });
      this.props.history.push("/noTeam");
    }
  };

  loginTeam = teamName => {
    this.setState({ team: teamName });
  };

  changeTeam = teamCode => {
    console.log("changeteam ran", teamCode);
    const teamInfo = store.teams.find(team => team.teamCode === teamCode);
    console.log(teamInfo, "teaminfo ");
    this.setState({ teamInfo: teamInfo, team: teamCode });
  };
  logout = () => {
    console.log("logout ran");
    if (window.confirm("Are you sure?")) {
      this.setState({
        user: "",
        team: "",
        userInfo: "",
        teamInfo: ""
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
                  loginUser={this.loginUser}
                  loginTeam={this.loginTeam}
                />
              );
            }}
          ></Route>
          <Route
            path="/teamPick"
            component={props => {
              return <PickTeam changeTeam={this.changeTeam} />;
            }}
          ></Route>
          <Route path="/manage" component={ManageTeam}></Route>
          <Route path="/settings" component={Settings}></Route>
          <Route path="/addEvent" component={CreateEvent}></Route>
          <Route path="/new" component={RegisterTeam}></Route>
          <Route
            path="/home"
            component={props => {
              return <Home logout={this.logout} />;
            }}
          ></Route>
          <Route path="/noTeam" component={NoTeamPage}></Route>
        </Switch>
      </TriviaContext.Provider>
    );
  }
}

export default withRouter(App);
