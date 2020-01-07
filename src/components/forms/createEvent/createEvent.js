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
      positionReminder: false,
      firstRadio: false,
      secondRadio: false,
      thirdRadio: false
    };
  }

  componentDidMount() {
    this.props.handlePageReload("/addEvent");
  }

  attendance = people => {
    return people.map(person => (
      <div key={person.username} className="personContainer">
        <label
          htmlFor={person.username}
          key={person.username}
          className="personLabel"
        >
          {person.nickname}
          <input
            onClick={e => {
              this.setState({
                blankAttendance: false,
                attendanceReminder: false
              });
              this.state.attendance.includes(e.target.value)
                ? this.setState({
                    attendance: this.state.attendance.filter(
                      person => person.username === e.target.value
                    )
                  })
                : this.setState({
                    attendance: [...this.state.attendance, e.target.value]
                  });
            }}
            type="checkbox"
            key={person.username}
            value={person.username}
            id={person.username}
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
          <label>Position</label>

          <select
            id="positionSelector"
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

  radioClicked(position) {
    if (this.state[position]) {
      const changedPosition = { position: false };
      this.setState(changedPosition);
    } else {
      const trueChangedPosition = { position: true };
      this.setState(trueChangedPosition);
    }
  }

  radioStyle(position) {
    if (this.state[position]) {
      return "checked";
    } else return "notChecked";
  }

  renderPositionWinnings = state => {
    if (state.win) {
      return (
        <>
          <label>Position:</label>
          <div className="radioFlexContainer">
            <div className="radioContainer">
              <span className="radioLabel">1st:</span>
              <label className="radioShell">
                <input
                  className="radioButton"
                  onClick={e => {
                    console.log("clicked");
                    this.radioClicked("firstRadio");
                    this.setState({ position: "1st", positionReminder: false });
                  }}
                  type="radio"
                  name="position"
                  id="first"
                ></input>
                <span
                  className={`checkbox ${this.radioStyle("firstRadio")}`}
                ></span>
              </label>
            </div>
            <div className="radioContainer">
              <span className="radioLabel">2nd:</span>
              <label className="radioShell">
                <input
                  className="radioButton"
                  onClick={e => {
                    console.log("clicked");
                    this.radioClicked("secondRadio");
                    this.setState({ position: "2nd", positionReminder: false });
                  }}
                  type="radio"
                  name="position"
                  id="second"
                ></input>
                <span
                  className={`checkbox ${this.radioStyle("secondRadio")}`}
                ></span>
              </label>
            </div>
            <div className="radioContainer">
              <span className="radioLabel">3rd:</span>
              <label className="radioShell">
                <input
                  className="radioButton"
                  onClick={e => {
                    console.log("clicked");
                    this.radioClicked("thirdRadio");
                    this.setState({ position: "3rd", positionReminder: false });
                  }}
                  type="radio"
                  name="position"
                  id="third"
                ></input>
                <span
                  className={`checkbox ${this.radioStyle("thirdRadio")}`}
                ></span>
              </label>
            </div>
          </div>

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
          if (value.teamInfo.members) {
            return (
              <div>
                <header>
                  <h1>Create Event</h1>
                </header>

                <form
                  id="createEventForm"
                  onSubmit={e => {
                    e.preventDefault();
                    if (this.state.attendance.length === 0) {
                      this.setState({ attendanceReminder: true });
                    }
                    if (!this.state.position) {
                      this.setState({ positionReminder: true });
                    }
                    if (
                      this.state.attendance.length !== 0 &&
                      this.state.position
                    ) {
                      const outcome = this.state.win ? "Win" : "Loss";
                      const newEvent = {
                        date: this.state.date,
                        location: this.state.location,
                        outcome: outcome,
                        roster: this.state.attendance,
                        position: this.state.position,
                        winnings: parseInt(this.state.winnings) || 0
                      };

                      //this will become a /post request
                      store
                        .addEvent(newEvent, value.teamInfo.teamcode)
                        .then(response => {
                          if (response.message) {
                            this.props.history.push("/error");
                          } else if (
                            response.error === "Unauthorized request "
                          ) {
                            this.props.history.push("/error");
                          } else
                            this.props.login(
                              value.userInfo.username,
                              value.teamInfo.teamcode
                            );
                        });
                    }
                  }}
                >
                  <fieldset id="outcomeFieldset">
                    <legend>Outcome</legend>
                    <p>Win:</p>
                    <label
                      htmlFor="win"
                      id="winLabel"
                      className="radioContainer"
                    >
                      Yes
                      <input
                        className="radioButton"
                        type="radio"
                        name="winLoss"
                        value="Yes"
                        id="win"
                        required
                        onClick={() =>
                          this.setState({ win: true, lossToggle: false })
                        }
                      ></input>
                      {/* <span className="checkbox"></span> */}
                    </label>
                    <label
                      htmlFor="loss"
                      id="lossLabel"
                      className="radioContainer"
                    >
                      No
                      <input
                        className="radioButton"
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
                      {/* <span className="checkbox"></span> */}
                    </label>
                    <br></br>
                    {this.lossToggle(this.state.lossToggle)}
                    {this.renderPositionWinnings(this.state)}
                  </fieldset>

                  <br></br>
                  <fieldset id="attendanceFieldset">
                    <legend htmlFor="attendance">Attendance</legend>
                    {this.attendance(value.teamMembers)}
                    {this.attendanceReminder(this.state.attendanceReminder)}
                  </fieldset>

                  <br></br>
                  <fieldset id="locationFieldset">
                    <legend>Details</legend>
                    <label htmlFor="location">Location:</label>
                    <input
                      type="text"
                      id="location"
                      required
                      onChange={e =>
                        this.setState({ location: e.target.value })
                      }
                    ></input>
                    <label htmlFor="date">Date:</label>
                    <input
                      required
                      type="date"
                      max="2025-12-31"
                      min="2010-12-31"
                      id="date"
                      onChange={e => this.setState({ date: e.target.value })}
                    ></input>
                    <button type="submit" id="createEventSubmitButton">
                      Submit
                    </button>
                  </fieldset>
                  <button
                    id="createEventDeleteButton"
                    type="button"
                    onClick={() => this.props.history.push("/home")}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            );
          }
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(CreateEvent);
