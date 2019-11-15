import React, { Component } from "react";
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
      team: "password",
      userInfo: STORE.users[0],
      teamInfo: STORE.teams[0]
    };
  }

  loginUser = userName => {
    //after the form validation, this function will set the user and team in state,
    //as well as fetching the user and team info and storing it in state

    const userInfo = store.users.find(user => user.userName === userName);
    const teamCode = userInfo.teams[0].teamCode;
    const teamInfo = store.teams.find(team => team.teamCode === teamCode);
    this.setState({ user: userName, userInfo: userInfo, teamInfo: teamInfo });
  };

  loginTeam = teamName => {
    this.setState({ team: teamName });
  };

  changeTeam = teamCode => {
    console.log("changeteam ran", teamCode);
    const teamInfo = store.teams.find(team => (team.teamcode = teamCode));
    console.log(teamInfo, "teaminfo ");
    this.setState({ teamInfo: teamInfo });
  };
  render() {
    console.log(this.state, "this.state in render");
    return (
      <TriviaContext.Provider
        value={{
          userInfo: this.state.userInfo,
          teamInfo: this.state.teamInfo
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
          <Route path="/home" component={Home}></Route>
        </Switch>
      </TriviaContext.Provider>
    );
  }
}

export default App;
