import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TriviaContext from "../context";
class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <TriviaContext.Consumer>
          {value => {
            return (
              <div>
                <h2>Oops! Somethings went wrong</h2>
                <button
                  onClick={() => {
                    this.setState({ hasError: false });
                    const sessionInfo = JSON.parse(
                      sessionStorage.getItem("state")
                    );
                    if (sessionInfo) {
                      console.log("had sessionInfo");
                      this.props.login(sessionInfo.user);
                    } else {
                      console.log("did not have session info");
                      this.props.history.push("/");
                    }
                  }}
                >
                  Got It
                </button>
              </div>
            );
          }}
        </TriviaContext.Consumer>
      );
    }
    return this.props.children;
  }
}

export default withRouter(Error);
