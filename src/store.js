export default {
  users: [
    {
      userName: "Rokio",
      name: "Nick",
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
        }
      ],
      password: "password",
      wins: 0,
      role: "Reporter"
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
    }
  ]
};
