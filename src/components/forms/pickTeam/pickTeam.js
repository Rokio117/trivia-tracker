import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./pickTeam.css";
class PickTeam extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Select Team:</h1>
        </header>
        <fieldset>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log(e.target.value);
              this.props.history.push("/home");
            }}
          >
            <select>
              <option>Team 1</option>
              <option>Team 2</option>
              <option>Team 3</option>
              <option>Team 4</option>
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

export default withRouter(PickTeam);
