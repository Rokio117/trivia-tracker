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
              <h3 id="wins">{`Total Wins(top 3): ${value.teamInfo.wins}`}</h3>
              <div id="placeContainer">
                <div id="firstPlace" className="place">
                  <span className="positionLabel">1st:</span>
                  <span className="positionName">
                    {value.teamInfo.firstplace}
                  </span>
                </div>
                <div id="secondPlace" className="place">
                  <span className="positionLabel">2nd:</span>
                  <span className="positionName">
                    {value.teamInfo.secondplace}
                  </span>
                </div>
                <div id="thirdPlace" className="place">
                  <span className="positionLabel">3rd:</span>
                  <span className="positionName">
                    {value.teamInfo.thirdplace}
                  </span>
                </div>
              </div>
              <div id="winnings">
                <span className="winningsLabel">Winnings: $ </span>
                <span className="winningsNumber">
                  {value.teamInfo.winnings}
                </span>
              </div>
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
