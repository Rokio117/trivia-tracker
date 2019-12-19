import config from "./config";

export const tokenFunctions = {
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  }
};
