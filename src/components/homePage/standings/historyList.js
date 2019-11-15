import React, { Component } from "react";
import HistoryDisplay from "./historyDisplay";

class HistoryList extends Component {
  makeList = () =>
    this.props.events.map(event => <HistoryDisplay event={event} />);
  render() {
    return <>{this.makeList()}</>;
  }
}
HistoryList.defaultProps = { events: [] };
export default HistoryList;
