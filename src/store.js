import config from "./config";
import { tokenFunctions } from "./tokenService";
const store = {
  //add in "authorization" headers to all protected endpoints

  getUser(username) {
    return fetch(`${config.API_ENDPOINT}/users/${username}`)
      .then(res => {
        console.log("res.ok");
        return res.json();
      })
      .catch(error => {
        const errorMessage = {
          message: "An error occurred. Please try again later"
        };
        return errorMessage;
      });
  },

  getTeam(teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/team`).then(res => {
      return res.json();
    });
  },
  getTeamsForUser(username) {
    return fetch(`${config.API_ENDPOINT}/users/${username}/teams`).then(res => {
      return res.json();
    });
  },

  getMembersOfTeam(teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/members`).then(
      res => {
        return res.json();
      }
    );
  },

  getNamedMembersOfTeam(teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/names`).then(res => {
      return res.json();
    });
  },
  postUserWithNoTeam(userObject) {
    return fetch(`${config.API_ENDPOINT}/users/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: userObject.username,
        nickname: userObject.nickname,
        password: userObject.password
      })
    }).then(res => {
      return res.json();
    });
  },
  teamExists(teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/exists`).then(
      res => {
        return res.json();
      }
    );
  },
  userExists(username) {
    return fetch(`${config.API_ENDPOINT}/users/${username}/exists`)
      .then(res => {
        return res.json();
      })
      .catch(error => {
        const errorMessage = {
          message: "An error occurred. Please try again later"
        };
        return errorMessage;
      });
  },
  postUserWithTeam: (userObject, teamCode) => {
    return fetch(`${config.API_ENDPOINT}/users/${userObject.username}/teams`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        nickname: userObject.nickname,
        password: userObject.password,
        teamcode: teamCode
      })
    }).then(res => {
      return res.json;
    });
  },

  postNewteam(teamObject) {
    return fetch(`${config.API_ENDPOINT}/teams/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${tokenFunctions.getAuthToken()}`
      },
      body: JSON.stringify({
        teamname: teamObject.teamname,
        teamcode: teamObject.teamcode,
        wins: teamObject.wins,
        firstplace: teamObject.firstplace,
        secondplace: teamObject.secondplace,
        thirdplace: teamObject.thirdplace,
        winnings: teamObject.winnings
      })
    }).then(res => {
      return res.json();
    });
  },
  addToTeam(playerUserName, teamCode, role) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/members`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${tokenFunctions.getAuthToken()}`
      },
      body: JSON.stringify({
        username: playerUserName,
        role: role
      })
    }).then(res => {
      return res.json();
    });
  },
  changeRole(username, role, teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/${username}/role`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${tokenFunctions.getAuthToken()}`
      },
      body: JSON.stringify({ role: role })
    }).then(res => {
      return res.json();
    });
  },
  changeWinnings(winnings, teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/winnings`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${tokenFunctions.getAuthToken()}`
      },
      body: JSON.stringify({ winnings: winnings })
    }).then(res => {
      return res.json();
    });
  },
  changeTeamName(name, teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/team`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${tokenFunctions.getAuthToken()}`
      },
      body: JSON.stringify({ newname: name })
    }).then(res => {
      return res.json();
    });
  },
  changeusername(newusername, username) {
    return fetch(`${config.API_ENDPOINT}/users/${username}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${tokenFunctions.getAuthToken()}`
      },
      body: JSON.stringify({ newusername: newusername })
    }).then(res => {
      return res.json();
    });
  },
  changePlayerName(newName, username) {
    return fetch(`${config.API_ENDPOINT}/users/${username}/name`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${tokenFunctions.getAuthToken()}`
      },
      body: JSON.stringify({ nickname: newName })
    }).then(res => {
      return res.json();
    });
  },
  addEvent(event, teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/event`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${tokenFunctions.getAuthToken()}`
      },
      body: JSON.stringify({
        date: event.date,
        location: event.location,
        outcome: event.outcome,
        roster: event.roster,
        position: event.position,
        winnings: event.winnings
      })
    }).then(res => {
      return res.json();
    });
  }
};

export default store;
