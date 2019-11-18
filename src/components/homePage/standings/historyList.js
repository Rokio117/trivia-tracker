import React, { Component } from "react";
import HistoryDisplay from "./historyDisplay";

class HistoryList extends Component {
  makeList = () =>
    this.props.events.map(event => <HistoryDisplay event={event} />);
  render() {
    console.log(this.props.events, "props.events in HistoryList");

    return <>{this.makeList()}</>;
  }
}
HistoryList.defaultProps = { events: [] };
export default HistoryList;
