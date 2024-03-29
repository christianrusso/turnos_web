import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { global } from "../../global/global";
import { token } from "../../global/token";
import { Observable } from "rxjs";

import "rxjs/add/operator/map";
@Injectable()
export class InfoService {
  public url: string;
  public token: string;
  private headers = new Headers({ "Content-Type": "application/json" });

  constructor(private _http: Http) {
    this.url = global.url;
  }

  GetByFilterClinic(data) { 
    this.getToken();
    if(this.token != null){
      this.headers.set("Authorization", "Bearer " + this.getToken().token);
    }
    return this._http
      .post(this.url + "Api/Clinic/GetByFilter", data, {
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
