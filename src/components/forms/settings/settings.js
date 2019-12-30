import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./settings.css";
import TriviaContext from "../../../context";
import store from "../../../store";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      newusername: "",
      changeName: false,
      changeusername: false,
      duplicateusername: false
    };
  }

  componentDidMount() {
    this.props.handlePageReload("/settings");
  }

  validateusername = username => {
    store
      .getUser(username)
      .then(response => {
        let outcome;
        if (response.username) {
          this.setState({ duplicateusername: true });
          outcome = false;
        } else outcome = true;
        return outcome;
      })
      .then(outcome => {
        return outcome;
      });
  };
  duplicateusername = duplicate => {
    if (duplicate) {
      return <p className="error">That User Name is Taken</p>;
    }
  };
  changeusernameForm = (state, newusername, username) => {
    if (state) {
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            store.userExists(newusername).then(userExists => {
              if (userExists.length) {
                this.setState({ duplicateusername: true });
              } else
                return store
                  .changeusername(newusername, username)
                  .then(response => {
                    if (response.error === "Unauthorized request ") {
                      this.props.history.push("/error");
                    } else if (response[0].username) {
                      this.props.login(newusername);
                    }
                  });
            });
          }}
        >
          <legend htmlFor="name">Change User Name:</legend>
          <input
            type="text"
            id="name"
            onChange={e =>
              this.setState({
                newusername: e.target.value,
                duplicateusername: false
              })
            }
          ></input>
          {this.duplicateusername(this.state.duplicateusername)}
          <button type="submit">Submit</button>
          <button
            id="changeName"
            type="button"
            onClick={e =>
              this.setState({
                changeusername: false
              })
            }
          >
            Cancel
          </button>
        </form>
      );
    }
  };

  changeNameForm = (state, username) => {
    if (state) {
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            store.changePlayerName(this.state.newName, username).then(res => {
              if (res.error === "Unauthorized request ") {
                this.props.history.push("/error");
              } else return this.props.login(username);
            });
          }}
        >
          <legend htmlFor="name">Change Name:</legend>
          <input
            type="text"
            id="name"
            onChange={e => this.setState({ newName: e.target.value })}
          ></input>
          <button type="submit">Submit</button>
          <button
            id="changeName"
            type="button"
            onClick={e =>
              this.setState({
                changeName: false
              })
            }
          >
            Cancel
          </button>
        </form>
      );
    }
  };
  render() {
    return (
      <TriviaContext.Consumer>
        {value => {
          return (
            <div>
              <header>
                <h1>Settings</h1>
              </header>
              <section>
                <div id="changeusername">
                  {`User Name: ${value.userInfo.username}`}
                  <button
                    type="button"
                    onClick={e =>
                      this.setState({
                        changeusername: !this.state.changeusername
                      })
                    }
                  >
                    Change
                  </button>
                  {this.changeusernameForm(
                    this.state.changeusername,
                    this.state.newusername,
                    value.userInfo.username
                  )}
                </div>

                <br></br>
                <div id="changeNameSettings">
                  {`Name: ${value.userInfo.nickname}`}
                  <button
                    type="button"
                    onClick={e =>
                      this.setState({
                        changeName: !this.state.changeName
                      })
                    }
                  >
                    Change
                  </button>
                  {this.changeNameForm(
                    this.state.changeName,
                    value.userInfo.username
                  )}
                </div>
                <div>{`Team User Name: ${value.teamInfo.teamcode}`}</div>
              </section>

              <button
                type="button"
                onClick={e => this.props.history.push("/home")}
              >
                Cancel
              </button>
            </div>
          );
        }}
      </TriviaContext.Consumer>
    );
  }
}

export default withRouter(Settings);
