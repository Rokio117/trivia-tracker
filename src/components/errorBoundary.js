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
                    const sessionInfo = JSON.parse(
                      sessionStorage.getItem("state")
                    );
                    if (sessionInfo) {
                      this.setState({ hasError: false });
                      this.props.login(sessionInfo.user);
                    } else {
                      this.setState({ hasError: false });
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

export default Error;
