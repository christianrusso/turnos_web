import { Component, OnInit } from '@angular/core';
import { FavoritosService } from "../../services/favoritos.service";

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
  providers: [FavoritosService]

})
export class FavoritosComponent implements OnInit {

  constructor(    private _FavoritosService: FavoritosService,
  ) { }

  ngOnInit() {
    this.getFavorite();
  }
 //Specialidades
 public getFavorite() {
  this._FavoritosService.getAll().subscribe(
    response => {
      console.log(response);
      console.log("hola");
    },
    error => {
      // Manejar errores
    }
  );
}
}
