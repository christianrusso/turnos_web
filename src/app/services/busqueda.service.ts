import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { global } from '../global/global';
import { token } from '../global/token';

import 'rxjs/add/operator/map';

@Injectable()
export class BusquedaService {
  public url: string;
  public token: string;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;

  }

  getByFilter(filtro) {
    return this._http.post(this.url + 'Api/Clinic/GetByFilter', filtro, { headers: this.headers })
      .map(res => res.json());
  }


  //Specialty
  getSpeciality() {
    return this._http.post(this.url + 'api/Data/GetSpecialtiesForSelect', {}, { headers: this.headers })
      .map(res => res.json());
  }
  //SubSpecialty
  getSubSpeciality() {
    return this._http.post(this.url + 'api/Data/GetSubspecialtiesForSelect', {}, { headers: this.headers })
      .map(res => res.json());
  }

  //ObrasSociales
  getMedicalInsurance() {
    return this._http.post(this.url + 'api/Data/GetMedicalInsurancesForSelect', {}, { headers: this.headers })
      .map(res => res.json());
  }
  //Ciudades
  getCities() {
    return this._http.post(this.url + 'api/Data/GetCitiesForSelect', {}, { headers: this.headers })
      .map(res => res.json());
  }


    //SubSpecialty
    getSubSpecialityOnEspeciality(id){
      return this._http.post(this.url + 'api/Data/GetSubspecialtiesForSelect', {"id":id},{headers: this.headers})
                      .map(res => res.json());
    }



}
