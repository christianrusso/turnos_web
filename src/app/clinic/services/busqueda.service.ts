import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { global } from "../../global/global";
import { token } from "../../global/token";
import { map } from "rxjs/operators";
// import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

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
      .post(this.url + "Api/Clinic/GetByFilter", filtro, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  //Specialty
  getSpeciality(id) {
    return this._http
      .post(
        this.url + "api/Data/GetSpecialtiesForSelect",
        {"id":id},
        { headers: this.headers }
      )
      .map(res => res.json());
  }
  //SubSpecialty
  getSubSpeciality(id) {
    return this._http
      .post(
        this.url + "api/Data/GetSubspecialtiesForSelect",
        {"rubro":id},
        { headers: this.headers }
      )
      .map(res => res.json());
  }

  //ObrasSociales
  getMedicalInsurance() {
    return this._http
      .post(
        this.url + "api/Data/GetMedicalInsurancesForSelect",
        {},
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
  getSubSpecialityOnEspeciality(id,idrubro) {
    return this._http
      .post(
        this.url + "api/Data/GetSubspecialtiesForSelect",
        { id: id,rubro: idrubro },
        { headers: this.headers }
      )
      .map(res => res.json());
  }

   //Favorito
   addFavorito(id) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);

    return this._http
      .post(
        this.url + "api/Client/AddFavoriteClinic",
        { id: id },
        { headers: this.headers }
      )
      .map(res => res.json());
  }
  removeFavorito(id) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(
        this.url + "api/Client/RemoveFavoriteClinic",
        { id: id },
        { headers: this.headers }
      )
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
