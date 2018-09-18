import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
@Injectable()
export class HomeService {

  constructor(private _http: Http) { }
  public dataForm;
   setData(categoria,fecha,lugar){
    // this.dataForm={"categoria":categoria,"fecha":fecha,"lugar":lugar};
    this,this.dataForm="hola";
    return this.dataForm;

  }
  getData(){
    return this.dataForm;
  }
}
