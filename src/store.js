const store = {
  users: [
    {
      userName: "Rokio",
      name: "Nick",
      password: "password"
    },
    {
      userName: "Jen",
      name: "Jennifer",
      password: "password"
    },
    {
      userName: "Ash",
      name: "Ashley",
      password: "password"
    },
    {
      userName: "Deandra",
      name: "Dee",
      password: "password"
    },
    {
      userName: "Charlie",
      name: "Charlie",
      password: "password"
    }
  ],
  teams: [
    {
      name: "We'll Win Again Someday",
      teamCode: "password",
      members: [
        {
          userName: "Rokio",
          role: "Captain"
        },
        {
          userName: "Jen",
          role: "Captain"
        },
        {
          userName: "Ash",
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
          roster: ["Rokio"],
          position: "4th",
          winnings: 20
        },
        {
          date: "1/23/19",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Rokio"],
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
          userName: "Rokio",
          role: "Captain"
        },
        {
          userName: "Deandra",
          role: "Captain"
        },
        {
          userName: "Mac",
          role: "Reporter"
        },
        {
          userName: "Charlie",
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
    }
  ],

  registerTeam: newTeam => {
    console.log(this.teams, "this.teams in store");
    store.teams.push(newTeam);
  },
  getUser(userName) {
    return store.users.find(user => user.userName === userName);
  },
  getTeam: teamCode => {
    return store.teams.find(team => team.teamCode === teamCode);
  },
  getTeamsForUser: userName => {
    return store.teams.filter(team =>
      team.members.map(member => member.userName).includes(userName)
    );
  },
  getMembersOfTeam: teamCode => {
    return store.teams.find(team => team.teamCode === teamCode).members;
  },
  postUserWithNoTeam: userObject => {
    store.users.push(userObject);
  },
  teamExists: teamCode => {
    return store.teams.includes(team => team.teamCode === teamCode);
  },
  userExists: userName => {
    return store.users.includes(user => user.userName === userName);
  },
  postUserWithTeam: (userObject, teamCode) => {
    const user = { userName: userObject.userName, role: "Captain" };
    store.user.push(userObject);
    store.teams.find(team => team.teamCode === teamCode).push(user);
  },
  postNewSettings: (newSettings, userName) => {
    store.users.find(user => user.userName === userName).name = newSettings;
  },
  postNewteam: teamObject => {
    store.teams.push(teamObject);
  },
  addToTeam: (player, teamCode) => {
    const newMember = {
      userName: player.userName,
      role: "Member"
    };
    store.teams
      .find(team => team.teamCode === teamCode)
      .members.push(newMember);
  },
  changeRole: (player, role, teamCode) => {
    store.teams
      .find(team => team.teamCode === teamCode)
      .members.find(member => member.userName === player.userName).role = role;
  },
  changeWinnings: (winnings, teamCode) => {
    store.teams.find(team => team.teamCode === teamCode).winnings = winnings;
  },
  changeTeamName: (name, teamCode) => {
    store.teams.find(team => team.teamCode === teamCode).name = name;
  },
  addEvent: (event, teamCode) => {
    store.teams.find(team => team.teamCode === teamCode).history.push(event);
  }
};

export default store;
