import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./standings.css";
class Standings extends Component {
  render() {
    return (
      <section id="standings">
        <h2>Standings</h2>
        <p id="wins">Wins:6</p>
        <p id="firstPlace" className="place">
          1st: 1
        </p>
        <p id="secondPlace" className="place">
          2nd: 2
        </p>
        <p id="thirdPlace" className="place">
          3rd: 3
        </p>
        <p id="winnings">Winnings:$85</p>
        <label htmlFor="history">History</label>
        <ul id="history">
          <li>1/22/19 Paddy's Pub Loss</li>
          <li>1/16/19 Paddy's Pub Loss</li>
          <li>1/8/19 Paddy's Pub Loss</li>
          <li>1/1/19 Paddy's Pub WIN</li>
        </ul>
      </section>
    );
  }
}

export default Standings;
