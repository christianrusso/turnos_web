import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserva-exito',
  templateUrl: './reserva-exito.component.html',
  styleUrls: ['./reserva-exito.component.css']
})
export class ReservaExitoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public volverBuscador(){
    window.location.href = '/buscador';

  }

}
