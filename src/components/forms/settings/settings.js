import React, { Component } from "react";
import "./settings.css";

class Settings extends Component {
  rend() {
    return (
      <div>
        <header>
          <h1>Settings</h1>
        </header>
        <fieldset>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name"></input>
            <label htmlFor="emblem">Emblem:</label>
            <select id="emblem">
              <option>♠</option>
              <option>♣</option>
              <option>♦</option>
              <option>♥</option>
            </select>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default Settings;
