import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { global } from "../../global/global";
import { token } from "../../global/token";
@Injectable()
export class EditarService {
  public url: string;
  public token: string;

  private headers;

  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;
    this.headers = new Headers(
        {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.getToken().token
        }
    );
  }

  saveAccountData(username, actualPassword, newPassword) {
    let options = {
      "email": username,
      "oldPassword": actualPassword,
      "newPassword": newPassword
    };
    return this._http
      .post(this.url + 'api/Account/Edit', options, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  getToken() {
    let token = localStorage.getItem("tokenTurnos");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }

    return JSON.parse(this.token);
  }
}