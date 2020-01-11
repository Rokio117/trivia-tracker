import React, { Component } from "react";
import "./history.css";
import TriviaContext from "../../../context";

//this component formats and returns an individual history component to historyList
//where it is then displayed
class HistoryDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { extended: false };
  }

  changeExtended = currentExtend => {
    const oppositeExtend = currentExtend ? false : true;
    this.setState({ extended: oppositeExtend });
  };
  arrow = currentExtended => {
    if (currentExtended) {
      return "▲";
    }
    return "▼";
  };
  fullHistoryInfo(attendance) {
    if (this.state.extended) {
      return (
        <>
          <h3>Details</h3>
          <li key={this.props.event.eventdate}>
            <div className="historyListLabel">
              Date:{" "}
              <span className="historyListData">
                {this.props.event.eventdate}
              </span>
            </div>
            <div className="historyListLabel">
              Location:{" "}
              <span className="historyListData">
                {this.props.event.locationname}
              </span>
            </div>
            <div className="historyListLabel">
              Outcome:{" "}
              <span className="historyListData">
                {this.props.event.outcome}
              </span>
            </div>
            <div className="historyListLabel">
              Position:{" "}
              <span className="historyListData">
                {this.props.event.position}
              </span>
            </div>
            <div className="historyListLabel">
              Winnings:{" "}
              <span className="historyListData">
                ${this.props.event.winnings}
              </span>
            </div>
            <h3 for="attendanceList" id="attendanceLabel">
              Attendance:
            </h3>
            <ul id="attendanceList">{attendance}</ul>
          </li>
        </>
      );
    }
  }
  display = (state, members) => {
    const attendance = this.props.event.roster.map(player => {
      const playerName = members.find(member => member.username === player)
        .nickname;
      return (
        <li key={player} className="attendancePlayer">
          {playerName}
        </li>
      );
    });

    return (
      <div id="eventContainer">
        <li id="compressedList" key={this.props.event.eventdate}>
          <div id="historyButtonContainer">
            <button
              id="extendButton"
              type="button"
              onClick={() => this.changeExtended(this.state.extended)}
            >
              {this.arrow(this.state.extended)}
            </button>
          </div>
          <div className="historyHeader">{this.props.event.eventdate}</div>
          <div className="historyHeader" id="historyHeaderLocation">
            {this.props.event.locationname}
          </div>
        </li>

        <div id="historyDetails">{this.fullHistoryInfo(attendance)}</div>
      </div>
    );
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          return <>{this.display(this.state.extended, value.teamMembers)}</>;
        }}
      </TriviaContext.Consumer>
    );
  }
}
export default HistoryDisplay;
