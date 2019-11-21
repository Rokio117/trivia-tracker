import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./pickTeam.css";
import TriviaContext from "../../../context";
class PickTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: "none",
      selectError: false
    };
  }
  selectError = state => {
    if (state) {
      return <p>Please select a team</p>;
    }
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          console.log("value in teamSelect", value);
          if (value.teamInfo && value.userInfo) {
            const teamList = value.userTeams.map(team => (
              <option value={team.teamCode}>{team.name}</option>
            ));
            console.log(value.team, "value.team in pickteam");
            return (
              <div>
                <header>
                  <h1>Select Team:</h1>
                </header>
                <fieldset>
                  <form
                    onSubmit={e => {
                      console.log(this.state.selectedTeam, "selected team");
                      console.log(this.state.selectedTeam === "none");
                      e.preventDefault();
                      if (this.state.selectedTeam === "none") {
                        this.setState({ selectError: true });
                      }
                      if (this.state.selectedTeam !== "none") {
                        this.props.changeTeam(this.state.selectedTeam);
                        this.props.history.push("/home");
                      }
                    }}
                  >
                    <select
                      onChange={e =>
                        this.setState({
                          selectedTeam: e.target.value
                        })
                      }
                    >
                      <option defaultValue="none">Pick One</option>
                      {teamList}
                    </select>
                    {this.selectError(this.state.selectError)}
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
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(PickTeam);
