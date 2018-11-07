import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { global } from "../../global/global";
import { token } from "../../global/token";
import { map } from "rxjs/operators";

@Injectable()
export class MiturnoService {
  public url: string;
  public token: string;
  private headers = new Headers({ "Content-Type": "application/json" });
  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;
  }
  GetWeekForClient(date) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "api/client/GetWeekForClient", date, {
        headers: this.headers
      })
      .map(res => res.json());
  }
  confirmTurn(data) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "api/Appointment/CompleteAppointment", data, {
        headers: this.headers
      })
      .map(res => res.json());
  }
  cancelTurn(data) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "api/Appointment/CancelAppointment", data, {
        headers: this.headers
      })
      .map(res => res.json());
  }
  getToken() {
    let token = localStorage.getItem("tokenTurnos");
    if (token != null) {
      this.token = token;
    } else {
      this.token = null;
    }

    return JSON.parse(this.token);
  }


}
