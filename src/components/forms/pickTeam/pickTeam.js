import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./pickTeam.css";
import TriviaContext from "../../../context";
import store from "../../../store";
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
          if (value.teamInfo && value.userInfo) {
            const teamList = value.userTeams.map(team => (
              <option value={team.teamcode}>{team.teamname}</option>
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
                      if (this.state.selectedTeam === "none") {
                        this.setState({ selectError: true });
                      }
                      if (this.state.selectedTeam !== "none") {
                        //const teamInfo = store.getTeam(this.state.selectedTeam);
                        const teamInfo = value.userTeams.filter(
                          team => team.teamcode === this.state.selectedTeam
                        )[0];
                        console.log(teamInfo, "teamInfo be");
                        this.props.loginTeam(teamInfo);
                      }
                    }}
                  >
                    <select
                      required
                      onChange={e =>
                        this.setState({
                          selectedTeam: e.target.value
                        })
                      }
                    >
                      <option value=""></option>
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
          } else this.props.history.push("/");
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(PickTeam);
