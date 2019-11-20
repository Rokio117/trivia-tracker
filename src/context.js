import React from "react";

const TriviaContext = React.createContext({
  userInfo: {},
  teamInfo: {},
  user: "",
  team: "",
  userTeams: []
});

export default TriviaContext;
