import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./settings.css";

class Settings extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Settings</h1>
        </header>
        <fieldset>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.history.push("/home");
            }}
          >
            <label htmlFor="name">Change Name:</label>
            <input type="text" id="name"></input>
            <label htmlFor="emblem">Emblem:</label>
            <select id="emblem">
              <option>♠</option>
              <option>♣</option>
              <option>♦</option>
              <option>♥</option>
            </select>
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
  }
}

export default withRouter(Settings);
