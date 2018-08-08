import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { global } from '../global/global';
import { token } from '../global/token';

import 'rxjs/add/operator/map';

@Injectable()
export class BusquedaService {
  public url: string;
  public token: string;

  private headers= new Headers({'Content-Type':'application/json'});
  
  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;

  }
   
   getByFilter(filtro){
    return this._http.post(this.url + 'Api/Clinic/GetByFilter',filtro ,{headers: this.headers})
                    .map(res => res.json());
  }


  //Specialty
  getSpeciality(){
    this.headers.set('Authorization',this.token)
    return this._http.post(this.url + 'Api/Specialty/GetByLetter',{letter: "*"},{headers: this.headers})
                    .map(res => res.json());
  }
   //SubSpecialty
   getSubSpeciality(){
    this.headers.set('Authorization',this.token)
    return this._http.get(this.url + 'Api/Subspecialty/GetAll',{headers: this.headers})
                    .map(res => res.json());
  }

  //ObrasSociales
  getMedicalInsurance(){
    this.headers.set('Authorization',this.token)
    return this._http.post(this.url + 'Api/MedicalInsurance/GetByLetter',{letter: "*"},{headers: this.headers})
                    .map(res => res.json());
  }
  
}
