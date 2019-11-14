import React, { Component } from "react";
import HistoryDisplay from "./historyDisplay";

class HistoryList extends Component {
  render() {
    return (
      <div>
        {this.props.events.map(event => {
          return <HistoryDisplay event={event} />;
        })}
      </div>
    );
  }
}

export default HistoryList;
