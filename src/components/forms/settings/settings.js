import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./settings.css";
import TriviaContext from "../../../context";
import store from "../../../store";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: ""
    };
  }
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          return (
            <div>
              <header>
                <h1>Settings</h1>
              </header>
              <fieldset>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    store.changePlayerName(
                      this.state.newName,
                      value.userInfo.userName
                    );
                    this.props.history.push("/home");
                  }}
                >
                  <label htmlFor="name">Change Name:</label>
                  <input
                    type="text"
                    id="name"
                    onChange={e => this.setState({ newName: e.target.value })}
                  ></input>
                  <button type="submit">Submit</button>
                  <button
                    type="button"
                    onClick={() => this.props.history.push("/home")}
                  >
                    Cancel
                  </button>
                </form>
              </fieldset>
            </div>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(Settings);
