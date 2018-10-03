import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  constructor(    private _router: Router,
    ) {}
    public buscador;
  ngOnInit() {
    $("header").hide();
    this.buscador = {
      categoria: "",
      fecha: "",
      ubicacion: ""
    };
  }

  redirectToPage(page){
    this.buscador.categoria=page;
    localStorage.setItem("busqueda", JSON.stringify(this.buscador));
    switch (parseInt(page )) {
      case 1:
      return this._router.navigate(["clinica/buscador"]);
      case 2:
       return this._router.navigate(["peluqueria/buscador"]);
      default:
      return this._router.navigate(["clinica/buscador"]);
    }
  }
}
