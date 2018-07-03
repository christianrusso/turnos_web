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
    await this.loadScript('../assets/js/script2.js');
  }

  public buscador;

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params["id"];
      $('select2 option[value=' + id + ']').attr("selected", true);
    });

    this.buscador = {
      "categoria": "2",
      "fecha": "2018/08/27",
      "ubicacion":"asd",
    }
  }

  onSubmit() {
      this.buscador={"categoria":$(".select2-hidden-accessible").val(),"fecha":this.buscador.fecha,"lugar":$(".select2-hidden-accessible").val()};
      localStorage.setItem('busqueda', JSON.stringify(this.buscador));
      this.busqueda = JSON.parse(localStorage.getItem('busqueda'));
      console.log (this.busqueda);
  }
}
