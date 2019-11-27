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
      return "↑";
    }
    return "↓";
  };
  display = (state, members) => {
    console.log("members in historyDisplay", members);
    console.log("event rosters in display history", this.props.event.roster);
    const attendance = this.props.event.roster.map(player => {
      const playerName = members.find(member => member.userName === player)
        .name;
      return <li key={player}>{playerName}</li>;
    });
    if (!this.state.extended) {
      return (
        <li id="compressedList">
          <button
            id="extendButton"
            type="button"
            onClick={() => this.changeExtended(this.state.extended)}
          >
            {this.arrow(this.state.extended)}
          </button>
          {this.props.event.date} {this.props.event.location}{" "}
          {this.props.event.outcome}
        </li>
      );
    }
    if (this.state.extended) {
      return (
        <li>
          <button
            id="extendButton"
            type="button"
            onClick={() => this.changeExtended(this.state.extended)}
          >
            {this.arrow(this.state.extended)}
          </button>
          <div>Date: {this.props.event.date}</div>
          <div>Location: {this.props.event.location}</div>
          <div>Outcome: {this.props.event.outcome} </div>
          <div>Position: {this.props.event.position}</div>
          <div>{`Winnings: $${this.props.event.winnings}`}</div>
          <ul>{attendance}</ul>
        </li>
      );
    }
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
