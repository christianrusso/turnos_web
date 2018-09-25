import { Component, OnInit, AfterViewInit } from "@angular/core";
import { BaseComponent } from "../../core/base.component";

@Component({
  selector: 'app-buscador-peluqueria',
  templateUrl: './buscador-peluqueria.component.html',
  styleUrls: ['./buscador-peluqueria.component.css']
})
export class BuscadorPeluqueriaComponent extends BaseComponent
implements OnInit, AfterViewInit {

  constructor() {
    super();

   }
   public busqueda = null;
   public clinicas;
   public filtro;
   public coments;
   public score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   public dontResult;
   public distancia;
   public especialidades;
   public subEspecialidades;
   public obrasSociales;
   public cities;
   public identity;
   public filtroFecha;
   public limitForEspecialidad = 5;
   public limitForSubEspecialidad = 5;
   public limitForObraSocial = 5;
   public limitForUbicacion = 5;
 
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script3.js");
  }
  ngOnInit() {
    $("header").show();
  }
  VerMapa() {
  }
}
