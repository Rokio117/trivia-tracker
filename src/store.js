export default {
  users: [
    {
      userName: "Rokio",
      name: "Nick",
      teams: [
        {
          teamName: "We'll Win Again Someday",
          teamCode: "password"
        },
        {
          teamName: "Paddy's Pub",
          teamCode: "password2"
        }
      ],
      password: "password",
      wins: 0,
      role: "Captain"
    },
    {
      userName: "Jen",
      name: "Jennifer",
      teams: [
        {
          teamName: "We'll Win Again Someday",
          teamCode: "password"
        }
      ],
      password: "password",
      wins: 0,
      role: "Captain"
    },
    {
      userName: "Ash",
      name: "Ashley",
      teams: [
        {
          teamName: "We'll Win Again Someday",
          teamCode: "password"
        },
        {
          teamName: "Paddy's Pub",
          teamCode: "password2"
        }
      ],
      password: "password",
      wins: 0,
      role: "Reporter"
    },
    {
      userName: "Deandra",
      name: "Dee",
      teams: [
        {
          teamName: "Paddy's pub",
          teamCode: "password2"
        }
      ],
      password: "password",
      wins: 0,
      role: "Captain"
    }
  ],
  teams: [
    {
      name: "We'll Win Again Someday",
      teamCode: "password",
      members: [
        {
          userName: "Rokio",
          role: "Captain",
          name: "Nick"
        },
        {
          userName: "Jen",
          role: "Captain",
          name: "Jennifer"
        },
        {
          userName: "Ash",
          role: "Reporter",
          name: "Ashley"
        }
      ],
      wins: 0,
      firstPlace: 0,
      secondPlace: 0,
      thirdPlace: 0,
      winnings: 0,
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
          role: "Captain",
          name: "Nick"
        },
        {
          userName: "Deandra",
          role: "Captain",
          name: "Dee"
        },
        {
          userName: "Mac",
          role: "Reporter",
          name: "Mac"
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

  registerTeam: teamInfo => {
    const newTeam = {
      name: teamInfo.name,
      teamCode: teamInfo.teamUserName,
      members: [teamInfo.members],
      wins: teamInfo.wins,
      firstPlace: teamInfo.firstPlace,
      secondPlace: teamInfo.secondPlace,
      thirdPlace: teamInfo.thirdPlace,
      winnings: teamInfo.winnings,
      history: []
    };
    console.log(this.teams, "this.teams in store");
    //this.teams.push(newTeam)
  }
};
