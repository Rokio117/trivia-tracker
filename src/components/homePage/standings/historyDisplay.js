import React, { Component } from "react";
import "./history.css";
import TriviaContext from "../../../context";
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
      return "△";
    }
    return "▽";
  };
  fullHistoryInfo(attendance) {
    if (this.state.extended) {
      return (
        <>
          <h4>Details</h4>
          <li key={this.props.event.eventdate}>
            <div>Date: {this.props.event.eventdate}</div>
            <div>Location: {this.props.event.locationname}</div>
            <div>Outcome: {this.props.event.outcome} </div>
            <div>Position: {this.props.event.position}</div>
            <div>{`Winnings: $${this.props.event.winnings}`}</div>
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
      return <li key={player}>{playerName}</li>;
    });

    return (
      <div id="eventContainer">
        <li id="compressedList" key={this.props.event.eventdate}>
          <button
            id="extendButton"
            type="button"
            onClick={() => this.changeExtended(this.state.extended)}
          >
            {this.arrow(this.state.extended)}
          </button>
          <span className="historyHeader">{this.props.event.eventdate}</span>
          <span className="historyHeader" id="historyHeaderLocation">
            {this.props.event.locationname}
          </span>
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
