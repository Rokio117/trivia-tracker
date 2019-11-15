import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./pickTeam.css";
import TriviaContext from "../../../context";
class PickTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: ""
    };
  }
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          const teamList = value.userInfo.teams.map(team => (
            <option>{team.teamName}</option>
          ));
          return (
            <div>
              <header>
                <h1>Select Team:</h1>
              </header>
              <fieldset>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.props.changeTeam(this.state.selectedTeam);
                    this.props.history.push("/home");
                  }}
                >
                  <select
                    onChange={e =>
                      this.setState({
                        selectedTeam: value.userInfo.teams.find(
                          team => team.teamName === e.target.value
                        ).teamCode
                      })
                    }
                  >
                    {teamList}
                  </select>
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

export default withRouter(PickTeam);
