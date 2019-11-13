import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./roster.css";
class Roster extends Component {
  render() {
    return (
      <section id="roster">
        <h2>Roster</h2>
        <p id="captain">Captain: Dennis</p>
        <label htmlFor="members">Members:</label>
        <ul id="members">
          <li>Mac</li>
          <li>Charlie</li>
          <li>Deandra</li>
          <li>Frank</li>
        </ul>
      </section>
    );
  }
}

export default Roster;
