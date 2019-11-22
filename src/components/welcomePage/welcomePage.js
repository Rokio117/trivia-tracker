import React, { Component } from "react";
import LoginForm from "../forms/loginForm/loginForm";
import RegisterUser from "../forms/registerUser/registerUser";
class WelcomePage extends Component {
  render() {
    return (
      <div>
        <h1>Trivia Tracker</h1>
        <p>
          Trivia Tracker is an app designed to help you keep track of your
          trivia team(s). You can add details about winnings, locations, dates,
          roster, wins, and more. After a game of trivia add details to the win
          so you can look back at your past roster for each game.
        </p>
        <LoginForm
          loginUser={this.props.loginUser}
          loginTeam={this.props.loginTeam}
        />
        <RegisterUser
          login={this.props.login}
          loginUser={this.props.loginUser}
          loginTeam={this.props.loginTeam}
        />
      </div>
    );
  }
}

export default WelcomePage;
