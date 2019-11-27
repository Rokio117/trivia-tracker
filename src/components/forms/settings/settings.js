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
      newUserName: "",
      changeName: false,
      changeUserName: false,
      duplicateUserName: false
    };
  }

  validateUserName = userName => {
    if (store.userExists(userName)) {
      this.setState({ duplicateUserName: true });
    }
    return store.userExists(userName);
  };
  duplicateUserName = duplicate => {
    if (duplicate) {
      return <p className="error">That User Name is Taken</p>;
    }
  };
  changeUserNameForm = (state, newUserName, userName) => {
    if (state) {
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!this.validateUserName(newUserName)) {
              store.changeUserName(newUserName, userName);
              this.props.login(newUserName);
            }
          }}
        >
          <legend htmlFor="name">Change User Name:</legend>
          <input
            type="text"
            id="name"
            onChange={e =>
              this.setState({
                newUserName: e.target.value,
                duplicateUserName: false
              })
            }
          ></input>
          {this.duplicateUserName(this.state.duplicateUserName)}
          <button type="submit">Submit</button>
          <button
            id="changeName"
            type="button"
            onClick={e =>
              this.setState({
                changeUserName: false
              })
            }
          >
            Cancel
          </button>
        </form>
      );
    }
  };

  changeNameForm = (state, userName) => {
    if (state) {
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            store.changePlayerName(this.state.newName, userName);
            this.props.login(userName);
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
                <div id="changeUserName">
                  {`User Name: ${value.userInfo.userName}`}
                  <button
                    type="button"
                    onClick={e =>
                      this.setState({
                        changeUserName: !this.state.changeUserName
                      })
                    }
                  >
                    Change
                  </button>
                  {this.changeUserNameForm(
                    this.state.changeUserName,
                    this.state.newUserName,
                    value.userInfo.userName
                  )}
                </div>

                <br></br>
                <div id="changeNameSettings">
                  {`Name: ${value.userInfo.name}`}
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
                    value.userInfo.userName
                  )}
                </div>
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
