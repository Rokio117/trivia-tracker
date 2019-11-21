import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./createEvent.css";
import TriviaContext from "../../../context";
import store from "../../../store";
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      win: false,
      lossToggle: false,
      position: "",
      winnings: 0,
      attendance: [],
      location: "",
      date: "",
      blankAttendance: true,
      attendanceReminder: false,
      positionReminder: false
    };
  }

  attendance = people => {
    return people.map(person => (
      <div key={person.userName}>
        <label
          htmlFor={person.userName}
          key={person.userName}
          className="personLabel"
        >
          {store.getNameFromUserName(person.userName)}
          <input
            onClick={e => {
              this.setState({
                blankAttendance: false,
                attendanceReminder: false
              });
              console.log(e.target.value, "e.target.value");
              console.log(this.state.attendance, typeof this.state.attendance);
              this.state.attendance.includes(e.target.value)
                ? this.setState({
                    attendance: this.state.attendance.filter(
                      person => person.userName === e.target.value
                    )
                  })
                : this.setState({
                    attendance: [...this.state.attendance, e.target.value]
                  });
            }}
            type="checkbox"
            key={person.userName}
            value={person.userName}
            id={person.userName}
            className="memberSelect"
          ></input>
        </label>
      </div>
    ));
  };

  lossToggle = loss => {
    if (loss) {
      let numbers = [];
      for (let i = 4; i <= 30; i++) {
        numbers.push(i);
      }
      const positions = numbers.map(number => {
        if (number === 21) {
          return String(number) + "st";
        }
        if (number === 22) {
          return String(number) + "nd";
        }
        if (number === 23) {
          return String(number) + "rd";
        } else {
          return String(number) + "th";
        }
      });
      return (
        <>
          <p>Position</p>

          <select
            onChange={e =>
              this.setState({
                position: e.target.value,
                positionReminder: false
              })
            }
          >
            <option value="">Choose</option>
            {positions.map(position => {
              return (
                <option key={position} value={position}>
                  {position}
                </option>
              );
            })}
          </select>
          {this.positionReminder(this.state.positionReminder)}
        </>
      );
    }
  };

  renderPositionWinnings = state => {
    if (state.win) {
      return (
        <>
          <p>Position:</p>
          <label htmlFor="first" id="positionLabel" className="positionLabel">
            1st:
            <input
              onClick={e =>
                this.setState({ position: "1st", positionReminder: false })
              }
              type="radio"
              name="position"
              className="position"
              id="first"
            ></input>
          </label>
          <label htmlFor="second" className="positionLabel">
            2nd:
            <input
              onClick={e =>
                this.setState({ position: "2nd", positionReminder: false })
              }
              type="radio"
              name="position"
              className="position"
              id="second"
            ></input>
          </label>
          <label htmlFor="third" className="positionLabel">
            3rd:
            <input
              onClick={e =>
                this.setState({ position: "3rd", positionReminder: false })
              }
              type="radio"
              name="position"
              className="position"
              id="third"
            ></input>
          </label>
          {this.positionReminder(this.state.positionReminder)}
          <br></br>
          <label htmlFor="winnings" id="winningsLabel">
            Winnings:
          </label>
          <input
            type="number"
            id="winnings"
            onChange={e => this.setState({ winnings: e.target.value })}
          ></input>
        </>
      );
    }
  };
  positionReminder = reminder => {
    if (reminder) {
      return <p className="error">Please choose a position</p>;
    }
  };
  attendanceReminder = reminder => {
    if (reminder) {
      return <p className="error">Pick a player</p>;
    }
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          console.log("value in createEvent", value);
          return (
            <div>
              <header>
                <h1>Create Event</h1>
              </header>
              <fieldset>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    console.log(this.state);
                    if (this.state.blankAttendance) {
                      this.setState({ attendanceReminder: true });
                    }
                    if (!this.state.position) {
                      this.setState({ positionReminder: true });
                    }
                    if (!this.state.blankAttendance && this.state.position) {
                      const outcome = this.state.win ? "Win" : "Loss";
                      const newEvent = {
                        date: this.state.date,
                        location: this.state.location,
                        outcome: outcome,
                        roster: this.state.attendance,
                        position: this.state.position,
                        winnings: this.state.winnings || 0
                      };

                      //this will become a /post request
                      store.addEvent(newEvent, value.teamInfo.teamCode);
                      console.log(newEvent);
                      this.props.history.push("/home");
                    }
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
                      onClick={() =>
                        this.setState({ win: true, lossToggle: false })
                      }
                    ></input>
                  </label>
                  <label htmlFor="loss" id="lossLabel">
                    No
                    <input
                      type="radio"
                      name="winLoss"
                      value="No"
                      id="loss"
                      onClick={() =>
                        this.setState({
                          win: false,
                          position: "",
                          winnings: "",
                          lossToggle: true
                        })
                      }
                    ></input>
                  </label>
                  <br></br>
                  {this.lossToggle(this.state.lossToggle)}
                  {this.renderPositionWinnings(this.state)}
                  <br></br>
                  <label htmlFor="attendance">Attendance</label>
                  {this.attendance(value.teamInfo.members)}
                  {this.attendanceReminder(this.state.attendanceReminder)}
                  <br></br>
                  <label htmlFor="location">Location:</label>
                  <input
                    type="text"
                    id="location"
                    required
                    onChange={e => this.setState({ location: e.target.value })}
                  ></input>
                  <label htmlFor="date">Date:</label>
                  <input
                    required
                    type="date"
                    id="date"
                    onChange={e => this.setState({ date: e.target.value })}
                  ></input>
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
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(CreateEvent);
