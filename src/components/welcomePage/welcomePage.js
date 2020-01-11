import React, { Component } from "react";
import LoginForm from "../forms/loginForm/loginForm";
import RegisterUserRefactor from "../forms/registerUser/registerUserRefactor";
import { loader } from "../../components/loader";
import "./welcomePage.css";
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { extended: true, loading: false };
  }

  setLoading = () => {
    this.state.loading
      ? this.setState({ loading: false })
      : this.setState({ loading: true });
    console.log("setLoading ran", this.state.loading);
  };

  aboutRender() {
    if (this.state.extended) {
      return (
        <>
          <p id="smallWelcomeInfo">
            Trivia Tracker is an app designed to help you keep track of your
            trivia team(s). You can add details about winnings, locations,
            dates, roster, wins, and more. After a game of trivia add details to
            the win so you can look back at your past roster for each game.
            <div
              onClick={e => this.setState({ extended: false })}
              id="closeInfoButton"
            >
              Close
            </div>
          </p>
        </>
      );
    } else
      return (
        <div
          id="smallWelcomeChoice"
          onClick={e => this.setState({ extended: true })}
        >
          About
        </div>
      );
  }

  render() {
    return (
      <div>
        {loader.displayLoading(this.state.loading)}
        <h1>Trivia Tracker</h1>
        <p id="welcomeInfo">
          Trivia Tracker is an app designed to help you keep track of your
          trivia team(s). You can add details about winnings, locations, dates,
          roster, wins, and more. After a game of trivia add details to the win
          so you can look back at your past roster for each game.
        </p>
        <LoginForm
          loginUser={this.props.login}
          loginTeam={this.props.loginTeam}
          setLoading={this.setLoading}
        />
        <RegisterUserRefactor
          login={this.props.login}
          loginTeam={this.props.loginTeam}
          setLoading={this.setLoading}
        />
        {this.aboutRender()}
      </div>
    );
  }
}

export default WelcomePage;
