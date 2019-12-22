import config from "./config";

const store = {
  users: [
    {
      username: "Rokio",
      name: "Nick",
      password: "password"
    },
    {
      username: "Jen",
      name: "Jennifer",
      password: "password"
    },
    {
      username: "Ash",
      name: "Ashley",
      password: "password"
    },
    {
      username: "Deandra",
      name: "Dee",
      password: "password"
    },
    {
      username: "Charlie",
      name: "Charlie",
      password: "password"
    },
    {
      username: "Mac",
      name: "Mac",
      password: "password"
    },
    {
      username: "Demo",
      name: "Demo",
      password: "password"
    },
    {
      username: "Demo2",
      name: "Demo Lovato",
      password: "password"
    },
    {
      username: "Demo3",
      name: "Demo Moore",
      password: "password"
    },
    {
      username: "Demo4",
      name: "Demenem",
      password: "password"
    },
    {
      username: "Harry",
      name: "Harry",
      password: "password"
    },
    {
      username: "Ron",
      name: "Ron",
      password: "password"
    },
    {
      username: "Hermione",
      name: "Hermione",
      password: "password"
    }
  ],
  teams: [
    {
      name: "We'll Win Again Someday",
      teamCode: "password",
      members: [
        {
          username: "Rokio",
          role: "Captain"
        },
        {
          username: "Jen",
          role: "Captain"
        },
        {
          username: "Ash",
          role: "Reporter"
        }
      ],
      wins: 6,
      firstPlace: 3,
      secondPlace: 2,
      thirdPlace: 1,
      winnings: 395,
      history: [
        {
          date: "1/22/19",
          location: "Paddy's Pub",
          outcome: "Loss",
          roster: ["Rokio", "Ash"],
          position: "4th",
          winnings: 20
        },
        {
          date: "1/23/19",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Rokio", "Ash", "Jen"],
          position: "1st",
          winnings: 30
        }
      ]
    },
    {
      name: "Paddy's pub",
      teamCode: "password2",
      members: [
        {
          username: "Rokio",
          role: "Captain"
        },
        {
          username: "Deandra",
          role: "Captain"
        },
        {
          username: "Mac",
          role: "Reporter"
        },
        {
          username: "Charlie",
          role: "Member"
        }
      ],
      wins: 1000,
      firstPlace: 1000,
      secondPlace: 999,
      thirdPlace: 888,
      winnings: 777,
      history: [
        {
          date: "1/22/19",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Rokio", "Mac", "Deandra"],
          position: "1st",
          winnings: 30
        },
        {
          date: "1/23/19",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Rokio", "Mac", "Deandra"],
          position: "1st",
          winnings: 30
        }
      ]
    },
    {
      name: "Demo Team",
      teamCode: "Demo",
      members: [
        {
          username: "Demo",
          role: "Captain"
        },
        {
          username: "Demo2",
          role: "Reporter"
        },
        {
          username: "Demo3",
          role: "Member"
        },
        {
          username: "Demo4",
          role: "Guest"
        }
      ],
      wins: 6,
      firstPlace: 1,
      secondPlace: 2,
      thirdPlace: 3,
      winnings: 100,
      history: [
        {
          date: "2019-12-12",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Demo", "Demo2", "Demo3", "Demo4"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-11-11",
          location: "Moes Tavern",
          outcome: "Win",
          roster: ["Demo", "Demo2", "Demo3", "Demo4"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-10-10",
          location: "Snakehole Lounge",
          outcome: "Win",
          roster: ["Demo", "Demo2"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-09-09",
          location: "The Drunken Clam",
          outcome: "Win",
          roster: ["Demo", "Demo2"],
          position: "2rd",
          winnings: 20
        },
        {
          date: "2019-08-08",
          location: "The Three Broomsticks",
          outcome: "Win",
          roster: ["Demo", "Demo2", "Demo3", "Demo4"],
          position: "2rd",
          winnings: 20
        },
        {
          date: "2019-08-07",
          location: "The Hog's Head",
          outcome: "Win",
          roster: ["Demo", "Demo2", "Demo3", "Demo4"],
          position: "1st",
          winnings: 30
        }
      ]
    },
    {
      name: "The Potters",
      teamCode: "Potter",
      members: [
        {
          username: "Demo",
          role: "Guest"
        },
        {
          username: "Harry",
          role: "Reporter"
        },
        {
          username: "Ron",
          role: "Guest"
        },
        {
          username: "Hermione",
          role: "Captain"
        }
      ],
      wins: 2,
      firstPlace: 0,
      secondPlace: 0,
      thirdPlace: 2,
      winnings: 20,
      history: [
        {
          date: "2019-12-12",
          location: "The Three Broomsticks",
          outcome: "Loss",
          roster: ["Harry", "Ron", "Hermione", "Demo"],
          position: "4th",
          winnings: 0
        },
        {
          date: "2019-12-5",
          location: "The Three Broomsticks",
          outcome: "Win",
          roster: ["Harry", "Ron", "Hermione", "Demo"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-11-28",
          location: "The Three Broomsticks",
          outcome: "Win",
          roster: ["Harry", "Ron", "Hermione"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-11-21",
          location: "The Three Broomsticks",
          outcome: "Loss",
          roster: ["Harry", "Ron", "Hermione"],
          position: "11th",
          winnings: 0
        }
      ]
    }
  ],
  //add in "authorization" headers to all protected endpoints
  registerTeam: newTeam => {
    console.log(this.teams, "this.teams in store");
    store.teams.push(newTeam);
  },

  getUser(username) {
    //return store.users.find(user => user.username === username);
    return fetch(`${config.API_ENDPOINT}/users/${username}`).then(res => {
      return res.json();
    });
  },
  getNameFromusername(username) {
    return store.users.find(user => user.username === username).name;
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
    // return store.teams.filter(team =>
    //   team.members.map(member => member.username).includes(username)
    // );
  },
  getUserFromusername: username => {
    return store.users.find(user => user.username === username);
  },
  getMembersOfTeam(teamCode) {
    //return store.teams.find(team => team.teamCode === teamCode).members;
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/members`).then(
      res => {
        return res.json();
      }
    );
  },
  getRoleOfUser: (username, teamCode) => {
    return store.teams
      .find(team => team.teamCode === teamCode)
      .members.find(member => member.username === username).role;
  },
  getNamedMembersOfTeam(teamCode) {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/names`).then(res => {
      return res.json();
    });
    // return members.map(member =>
    //   Object.assign(member, {
    //     name: store.getNameFromusername(member.username)
    //   })
    // );
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
    return fetch(`${config.API_ENDPOINT}/users/${username}/exists`).then(
      res => {
        return res.json();
      }
    );
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
  postNewSettings: (newSettings, username) => {
    store.users.find(user => user.username === username).name = newSettings;
  },
  postNewteam(teamObject) {
    console.log(teamObject, "teamObject in postNewteam");
    return fetch(`${config.API_ENDPOINT}/teams/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
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
    //store.teams.push(teamObject);
  },
  addToTeam: (playerUserName, teamCode, role) => {
    return fetch(`${config.API_ENDPOINT}/teams/${teamCode}/members`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: playerUserName,
        role: role
      })
    }).then(res => {
      res.json();
    });
  },
  changeRole: (player, role, teamCode) => {
    store.teams
      .find(team => team.teamCode === teamCode)
      .members.find(member => member.username === player).role = role;
  },
  changeWinnings: (winnings, teamCode) => {
    store.teams.find(team => team.teamCode === teamCode).winnings = winnings;
  },
  changeTeamName: (name, teamCode) => {
    store.teams.find(team => team.teamCode === teamCode).name = name;
  },
  changeusername(newusername, username) {
    console.log(
      newusername,
      "newusername",
      username,
      "username",
      " in changeusername"
    );
    return fetch(`${config.API_ENDPOINT}/users/${username}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ newusername: newusername })
    }).then(res => {
      return res.json();
    });
  },
  changePlayerName(newName, username) {
    console.log(newName, "newname", username, "username in change player name");
    return fetch(`${config.API_ENDPOINT}/users/${username}/name`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ nickname: newName })
    }).then(res => {
      return res.json();
    });
  },
  addEvent: (event, teamCode) => {
    const winnings =
      parseInt(store.teams.find(team => team.teamCode === teamCode).winnings) +
      parseInt(event.winnings);
    store.teams.find(team => team.teamCode === teamCode).history.unshift(event);
    console.log("winnings in store.addEvent", winnings, typeof winnings);
    store.teams.find(team => team.teamCode === teamCode).winnings = winnings;

    if (event.outcome === "Win") {
      const position = event.position;
      store.teams.find(team => team.teamCode === teamCode).wins++;
      if (position === "1st") {
        store.teams.find(team => team.teamCode === teamCode).firstPlace++;
      }
      if (position === "2nd") {
        store.teams.find(team => team.teamCode === teamCode).secondPlace++;
      }
      if (position === "3rd") {
        store.teams.find(team => team.teamCode === teamCode).thirdPlace++;
      }
    }
  }
};

export default store;
