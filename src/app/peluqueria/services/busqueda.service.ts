import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { global } from "../../global/global";
import { token } from "../../global/token";
import { map } from "rxjs/operators";
// import 'rxjs/add/operator/map';

@Injectable()
export class BusquedaService {
  public url: string;
  public token: string;

  private headers = new Headers({ "Content-Type": "application/json" });

  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;
  }

  getByFilter(filtro) {
    return this._http
      .post(this.url + "Api/Hairdressing/Hairdressing/GetByFilter", filtro, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  //Specialty
  getSpeciality(id) {
    return this._http
      .post(
        this.url + "Api/Data/GetSpecialtiesForSelect",
        {
          "Id": id
        },
        { headers: this.headers }
      )
      .map(res => res.json());
  }
  //SubSpecialty
  getSubSpeciality(id, specialities) {
    return this._http
      .post(
        this.url + "api/Data/GetSubspecialtiesForSelect",
        {"rubro":id, "Ids": specialities},
        { headers: this.headers }
      )
      .map(res => res.json());
  }

  //Ciudades
  getCities() {
    return this._http
      .post(
        this.url + "api/Data/GetCitiesForSelect",
        {},
        { headers: this.headers }
      )
      .map(res => res.json());
  }

  //SubSpecialty
  getSubSpecialityOnEspeciality(id, rubro) {
    return this._http
      .post(
        this.url + "api/Data/GetSubspecialtiesForSelect",
        { ids: [id], rubro: rubro },
        { headers: this.headers }
      )
      .map(res => res.json());
  }
}
