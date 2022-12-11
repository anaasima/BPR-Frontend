import http, { authHeader } from "./http-common";

class PatientWebClientService {
  urlResource = "/patients";

  get(date) {
    if (date !== null) {
      return http.get(`${this.urlResource}?date=${date}`, authHeader());
    }
    return http.get(`${this.urlResource}`);
  }

  getPatientImageById(patientId) {
    return http.get(`${this.urlResource}/images/${patientId}`, authHeader());
  }

  getPatientByCpr(patientCpr) {
    return http.get(`${this.urlResource}/cpr/${patientCpr}`, authHeader());
  }
}

export default new PatientWebClientService();
