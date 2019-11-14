import React, { Component } from "react";

class HistoryDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { extended: false };
  }

  changeExtended = currentExtend => {
    this.setState({ extended: !currentExtend });
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
    if (!state.extended) {
      return (
        <li>
          <button
            type="button"
            onClick={() => this.changeExtended(this.state.extended)}
          >
            {this.arrow(this.state.extended)}
          </button>
          {this.props.event.date} {this.props.event.location}{" "}
          {this.props.event.winOrLoss}
        </li>
      );
    }
    return (
      <li>
        <button
          type="button"
          onClick={() => this.changeExtended(this.state.extended)}
        >
          {this.arrow(this.state.extended)}
        </button>
        <div>Date: </div>
        <div>Location: </div>
        <div>Win: </div>
        <div>Position: </div>
        <div>Winnings: </div>
        <ul>{attendance}</ul>
      </li>
    );
  };
  render() {
    return this.display;
  }
}
export default HistoryDisplay;
