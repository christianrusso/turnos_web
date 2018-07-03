import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
