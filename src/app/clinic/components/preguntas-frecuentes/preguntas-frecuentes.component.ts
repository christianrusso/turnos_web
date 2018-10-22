import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../../core/base.component";

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script5.js");
  }
  
  ngOnInit() {
  }

}
