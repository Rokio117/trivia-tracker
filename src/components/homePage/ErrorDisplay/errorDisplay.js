import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ErrorDisplay extends Component {
  render() {
    return (
      <>
        <h2>Oops! Something went wrong</h2>
        <button
          onClick={() => {
            this.setState({ hasError: false });
            const sessionInfo = JSON.parse(sessionStorage.getItem("state"));
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
      </>
    );
  }
}

export default withRouter(ErrorDisplay);
