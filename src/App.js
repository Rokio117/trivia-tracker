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

import { Route, Switch } from "react-router-dom";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      team: ""
    };
  }

  validateUser = userName => {
    console.log("validateUser Ran", userName);
    //this.setState({ user: userName });
  };

  validatePassword = password => {
    console.log("validate password ran", password);
  };

  updateTeam = teamName => {
    console.log("updateTeam Ran", teamName);
    //this.setState({ team: teamName });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={props => {
            return (
              <WelcomePage
                updateUser={this.updateUser}
                updateTeam={this.updateTeam}
                validatePassword={this.validatePassword}
              />
            );
          }}
        ></Route>
        <Route path="/teamPick" component={PickTeam}></Route>
        <Route path="/manage" component={ManageTeam}></Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/addEvent" component={CreateEvent}></Route>
        <Route path="/new" component={RegisterTeam}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    );
  }
}

export default App;
