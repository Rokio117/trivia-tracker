import React, { Component } from "react";
import "./standings.css";
import TriviaContext from "../../../context";
import HistoryList from "./historyList";

class Standings extends Component {
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          return (
            <section id="standings">
              <h2>Standings</h2>
              <h3 id="wins">{`Total Wins(top 3) ${value.teamInfo.wins}`}</h3>
              <p id="firstPlace" className="place">
                1st: {value.teamInfo.firstplace}
              </p>
              <p id="secondPlace" className="place">
                2nd: {value.teamInfo.secondplace}
              </p>
              <p id="thirdPlace" className="place">
                3rd: {value.teamInfo.thirdplace}
              </p>
              <p id="winnings">{`Winnings: $${value.teamInfo.winnings}`}</p>
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
