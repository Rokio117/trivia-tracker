import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./createEvent.css";
class CreateEvent extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Create Event</h1>
        </header>
        <fieldset>
          <form>
            <label htmlFor="winLoss">Win:</label>
            <input type="radio" name="winLoss" value="Yes" required>
              Yes
            </input>
            <input type="radio" name="winLoss" value="No">
              No
            </input>
            <br></br>
            <label htmlFor="position" id="positionLabel">
              Position:
            </label>
            <input type="radio" name="position" className="position">
              1st
            </input>
            <input type="radio" name="position" className="position">
              2nd
            </input>
            <input type="radio" name="position" className="position">
              3rd
            </input>
            <br></br>
            <label htmlFor="winnings" id="winningsLabel">
              Winnings:
            </label>
            <input type="number" id="winnings"></input>
            <br></br>
            <label htmlFor="attendance">Attendance</label>
            <input type="radio">Mac</input>
            <input type="radio">Charlie</input>
            <input type="radio">Deandra</input>
            <input type="radio">Frank</input>
            <input type="radio">Dennis</input>
            <br></br>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" required></input>
            <button type="submit">Submit</button>
            <button type="cancel" onClick={this.props.history.push("/home")}>
              Cancel
            </button>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default withRouter(CreateEvent);
