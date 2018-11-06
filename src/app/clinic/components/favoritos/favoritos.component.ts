import { Component, OnInit } from '@angular/core';
import { FavoritosService } from "../../services/favoritos.service";

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
  providers: [FavoritosService]

})
export class FavoritosComponent implements OnInit {

  public score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(    private _FavoritosService: FavoritosService,
  ) { }
    public favoritos;
  ngOnInit() {
    this.getFavorite();
  }
 //favoritos
 public getFavorite() {
  this._FavoritosService.getAll().subscribe(
    response => {
      this.favoritos=response;
   
    },
    error => {
      // Manejar errores
    }
  );
 }

 public deleteFavorite(id) {
      this._FavoritosService.removeFavorite(id).subscribe(
          response => {
              this.getFavorite();
          },
          error => {
              // Manejar errores
          }
      );
 }
}
