import React, { Component } from "react";
import "./pickTeam.css";
class PickTeam extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Select Team:</h1>
        </header>
        <fieldset>
          <form>
            <select>
              <option>Team 1</option>
              <option>Team 2</option>
              <option>Team 3</option>
              <option>Team 4</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default PickTeam;
