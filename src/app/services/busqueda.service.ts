import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { global } from '../global/global';
import 'rxjs/add/operator/map';

@Injectable()
export class BusquedaService {
  public url: string;
  private headers= new Headers({'Content-Type':'application/json'});
  
  constructor(private _http: Http) {
    this.url = global.url;
  }
   
   getByFilter(filtro){
    return this._http.post(this.url + 'Api/Clinic/GetByFilter',filtro ,{headers: this.headers})
                    .map(res => res.json());
  }
}
