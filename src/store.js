export default {
  users: [
    {
      userName: "Rokio",
      name: "Nick",
      teams: ["We'll Win Again Someday"],
      teamPw: "password",
      password: "password",
      wins: 0,
      role: "Captain"
    }
  ],
  teams: [
    {
      name: "We'll Win Again Someday",
      members: ["Rokio"],
      wins: 0,
      firstPlace: 0,
      secondPlace: 0,
      thirdPlace: 0,
      winnings: 0,
      history: [
        {
          date: "1/22/19",
          location: "Paddy's Pub",
          winOrLoss: "Loss",
          roster: ["Rokio"]
        }
      ]
    }
  ]
};
