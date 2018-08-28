import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { global } from '../global/global';
import { token } from '../global/token';

import 'rxjs/add/operator/map';
@Injectable()
export class ReservaService {


  public url: string;
  public token: string;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;

  }

  GetAvailableAppontmentsPerDay(date) {
    this.headers.set('Authorization',"Bearer "+this.getToken().token);
    return this._http.post(this.url + 'api/Appointment/GetAvailableAppointmentsPerDay',date, { headers: this.headers })
      .map(res => res.json());
  }
  GetDoctor(date) {
    this.headers.set('Authorization',"Bearer "+this.getToken().token);
    return this._http.post(this.url + 'api/Doctor/GetByFilter',date, { headers: this.headers })
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
  
  GetAllAvailablesForDay(data){
    this.headers.set('Authorization',"Bearer "+this.getToken().token);
    return this._http.post(this.url + 'api/Appointment/GetAllAvailablesForDay',data, { headers: this.headers })
      .map(res => res.json());
  }
}
