import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ErrorDisplay extends Component {
  render() {
    return (
      <>
        <h2>
          Oops! Something went wrong. If this problem persists try logging out
          and back in.
        </h2>
        <button
          onClick={() => {
            this.setState({ hasError: false });
            const sessionInfo = JSON.parse(sessionStorage.getItem("state"));
            if (sessionInfo) {
              this.props.login(sessionInfo.user);
            } else {
              this.props.history.push("/");
            }
          }}
        >
          Got It
        </button>
      </>
    );
  }
}

export default withRouter(ErrorDisplay);
