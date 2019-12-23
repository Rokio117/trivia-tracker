import config from "./config";

export const tokenFunctions = {
  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`);
  },
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  }
};
