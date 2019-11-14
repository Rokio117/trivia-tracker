import React, { Component } from "react";
import "./history.css";
class HistoryDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { extended: false };
  }

  changeExtended = currentExtend => {
    const oppositeExtend = currentExtend ? false : true;
    console.log(currentExtend, "current", oppositeExtend, "opposite");
    this.setState({ extended: oppositeExtend });
  };
  arrow = currentExtended => {
    if (currentExtended) {
      return "↑";
    }
    return "↓";
  };
  display = state => {
    const attendance = this.props.event.roster.map(player => {
      return <li>{player}</li>;
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
          <div>Position: {this.props.event.outcome}</div>
          <div>Winnings: {this.props.event.winnings}</div>
          <ul>{attendance}</ul>
        </li>
      );
    }
  };
  render() {
    return <>{this.display(this.state.extended)}</>;
  }
}
export default HistoryDisplay;
