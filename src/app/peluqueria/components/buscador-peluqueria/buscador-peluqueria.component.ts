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

  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script3.js");
  }
  ngOnInit() {
    $("header").show();
  }

}
