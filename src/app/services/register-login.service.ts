import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { global } from '../global/global';
import { token } from '../global/token';

import 'rxjs/add/operator/map';
@Injectable()
export class RegisterLoginService {
  public url: string;
  public token: string;

  private headers= new Headers({'Content-Type':'application/json'});
  
  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;

  }
  onLogin(user){
    return this._http.post(this.url + 'Api/account/login',user ,{headers: this.headers})
                    .map(res => res.json());
  }

   onRegister(user){
    return this._http.post(this.url + 'api/client/register',user ,{headers: this.headers})
                    .map(res => res.json());
  }

	getToken(){
		let token = localStorage.getItem('tokenTurnos');
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}
}
