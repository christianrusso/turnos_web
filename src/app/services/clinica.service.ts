import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { global } from '../global/global';
import { token } from '../global/token';
@Injectable()
export class ClinicaService {

  public url: string;
  public token: string;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;

  }

 PostRegisterClinic(clinica) {
    this.headers.set('Authorization',"Bearer "+this.getToken());
    return this._http.post(this.url + 'Api/account/registery',clinica, { headers: this.headers })
      .map(res => res.json());
  }
   //Ciudades
   getCities() {
    return this._http.post(this.url + 'api/Data/GetCitiesForSelect', {}, { headers: this.headers })
      .map(res => res.json());
  }
  getToken(){
		let token = localStorage.getItem('tokenTurnos');
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return JSON.parse(this.token);
  }
}
