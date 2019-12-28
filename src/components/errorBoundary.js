import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
        <div>
          <h2>Oops! Somethings went wrong</h2>
          <button
            onClick={() => {
              const sessionInfo = JSON.parse(sessionStorage.getItem("state"));
              if (sessionInfo) {
                this.login(sessionInfo.user);
              } else this.props.history.push("/");
            }}
          >
            Got It
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default Error;
