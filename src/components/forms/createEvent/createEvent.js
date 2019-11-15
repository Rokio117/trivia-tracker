import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./createEvent.css";
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      win: false
    };
  }

  renderPositionWinnings = state => {
    if (state.win) {
      return (
        <>
          <p>Position:</p>
          <label htmlFor="first" id="positionLabel" className="positionLabel">
            1st:
            <input
              type="radio"
              name="position"
              className="position"
              id="first"
            ></input>
          </label>
          <label htmlFor="second" className="positionLabel">
            2nd:
            <input
              type="radio"
              name="position"
              className="position"
              id="second"
            ></input>
          </label>
          <label htmlFor="third" className="positionLabel">
            3rd:
            <input
              type="radio"
              name="position"
              className="position"
              id="third"
            ></input>
          </label>
          <br></br>
          <label htmlFor="winnings" id="winningsLabel">
            Winnings:
          </label>
          <input type="number" id="winnings"></input>
        </>
      );
    }
  };
  render() {
    return (
      <div>
        <header>
          <h1>Create Event</h1>
        </header>
        <fieldset>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.history.push("/home");
            }}
          >
            <p>Win:</p>
            <label htmlFor="win" id="winLabel">
              Yes
              <input
                type="radio"
                name="winLoss"
                value="Yes"
                id="win"
                required
                onClick={() => this.setState({ win: true })}
              ></input>
            </label>
            <label htmlFor="loss" id="lossLabel">
              No
              <input
                type="radio"
                name="winLoss"
                value="No"
                id="loss"
                onClick={() => this.setState({ win: false })}
              ></input>
            </label>
            <br></br>
            {this.renderPositionWinnings(this.state)}
            <br></br>
            <label htmlFor="attendance">Attendance</label>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
            <br></br>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" required></input>
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={() => this.props.history.push("/home")}
            >
              Cancel
            </button>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default withRouter(CreateEvent);
