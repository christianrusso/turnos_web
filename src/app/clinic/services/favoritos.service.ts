import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { global } from "../../global/global";
import { token } from "../../global/token";
@Injectable()
export class FavoritosService {

  public url: string;
  public token: string;

  private headers = new Headers({ "Content-Type": "application/json" });

  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;
  }


  //favoritos
  getAll() {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .get(
        this.url + "Api/Client/GetFavoriteClinics",
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
  removeFavorite(id) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
        .post(this.url + 'Api/Client/RemoveFavoriteClinic', {Id: id}, {
          headers: this.headers
        })
        .map(res => res.json());
  }
}
