import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./standings.css";
import TriviaContext from "../../../context";
import HistoryList from "./historyList";

class Standings extends Component {
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          console.log(value.teamInfo.history, "value.teaminfo.history");

          return (
            <section id="standings">
              <h2>Standings</h2>
              <p id="wins">Total Wins(top 3){value.teamInfo.wins}</p>
              <p id="firstPlace" className="place">
                1st: {value.teamInfo.firstPlace}
              </p>
              <p id="secondPlace" className="place">
                2nd: {value.teamInfo.secondPlace}
              </p>
              <p id="thirdPlace" className="place">
                3rd: {value.teamInfo.thirdPlace}
              </p>
              <p id="winnings">Winnings:$ {value.teamInfo.winnings}</p>
              <label htmlFor="history">History</label>
              <ul id="history">
                <HistoryList events={value.teamInfo.history} />
              </ul>
            </section>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default Standings;
