import React, { Component } from "react";
import HistoryDisplay from "./historyDisplay";

class HistoryList extends Component {
  makeList = () =>
    this.props.events.map(event => <HistoryDisplay event={event} />);
  render() {
    return <>{this.makeList()}</>;
  }
}

export default HistoryList;
