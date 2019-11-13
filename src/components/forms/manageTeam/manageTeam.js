import React, { Component } from "react";
import "./manageTeam.css";
class ManageTeam extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Manage Team</h1>
        </header>
        <fieldset>
          <form>
            <label htmlFor="addPlayer">Add Player:</label>
            <input type="text" id="addPlayer"></input>
            <br></br>
            <label htmlFor="changeRole">Change Role</label>
            <select id="teammateSelect">
              <option>Mac</option>
              <option>Charlie</option>
              <option>Deandra</option>
              <option>Frank</option>
            </select>
            <select id="roleChange">
              <option>Captain</option>
              <option>Reporter</option>
              <option>Member</option>
              <option>Guest</option>
            </select>
            <br></br>
            <label htmlFor="winnings">Winnings $</label>
            <input type="number" id="winnings" placeholder="85"></input>
            <br></br>
            <label htmlFor="teamName">Team Name:</label>
            <input
              id="teamName"
              type="text"
              placeholder="Placeholder Name"
            ></input>
            <br></br>
            <label htmlFor="icon">Icon:</label>
            <select>
              <option>♣</option>
              <option>♦</option>
              <option>♥</option>
              <option>♠</option>
            </select>
            <br></br>
            <button type="submit">Submit</button>
            <button type="cancel">Cancel</button>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default ManageTeam;
