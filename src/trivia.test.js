import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import CreateEvent from "../src/components/forms/createEvent/createEvent";
import LoginForm from "../src/components/forms/loginForm/loginForm";
import ManageTeam from "../src/components/forms/manageTeam/manageTeamRefactor";
import PickTeam from "./components/forms/pickTeam/pickTeam";
import RegisterTeam from "./components/forms/registerTeam/registerTeam";
import RegisterUser from "./components/forms/registerUser/registerUser";
import Settings from "./components/forms/settings/settings";
import Home from "./components/homePage/home/home";
import NavBar from "./components/homePage/navBar/navBar";
import NoTeamPage from "./components/homePage/noTeamPage/noTeamPage";
import Roster from "./components/homePage/roster/roster";
import Standings from "./components/homePage/standings/standings";
import WelcomePage from "./components/welcomePage/welcomePage";

describe("Home Components", () => {
  const div = document.createElement("div");
  it("App renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Home renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <Home handlePageReload={endpoint => {}} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("navBar renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("noTeamPage renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <NoTeamPage />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("roster renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <Roster />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("standings renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <Standings />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("WelcomePage renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Form Components", () => {
  const div = document.createElement("div");
  it("CreateEvent form renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <CreateEvent handlePageReload={endpoint => {}} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("LoginForm form renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("manageTeam renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <ManageTeam handlePageReload={endpoint => {}} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("pickTeam renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <PickTeam handlePageReload={endpoint => {}} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("registerTeam renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <RegisterTeam />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("registerUser renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <RegisterUser />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("settings renders without crashing", () => {
    ReactDOM.render(
      <BrowserRouter>
        <Settings handlePageReload={endpoint => {}} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
