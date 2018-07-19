import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService} from "../../services/home.service"
import { busqueda } from '../../global/busqueda';
import { BaseComponent } from '../../core/base.component';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService]
})

export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit{
  public busqueda: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _HomeService: HomeService
  ){
    super();
    this.busqueda = busqueda.categoria;
  }

   async ngAfterViewInit(): Promise<void> {
    await this.loadScript('/assets/js/script2.js');
  }

  public buscador;

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params["id"];
      $('select2 option[value=' + id + ']').attr("selected", true);
    });

    this.buscador = {
      "categoria": "",
      "fecha": "",
      "ubicacion":"",
    }
  }

  onSubmit() {
    window.location.href = '/buscador';

  }

  lugar(lugar){
    this.buscador.lugar=lugar.data[0].text;
    localStorage.setItem('busqueda', JSON.stringify(this.buscador));

  }
  categoria(categoria){
    this.buscador.categoria=categoria.data[0].text;
    localStorage.setItem('busqueda', JSON.stringify(this.buscador));

  }


}
