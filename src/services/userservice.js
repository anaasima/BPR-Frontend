import http from "./http-common";

class UserWebClientService {
  urlResource = "/users";

  login(credentials) {
    return http.post(`${this.urlResource}`, credentials);
  }
}

export default new UserWebClientService();
