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
    return this._http
      .post(this.url + "Api/Clinic/GetByFilter", data, {
        headers: null
      })
      .map(res => res.json());
  }


}
