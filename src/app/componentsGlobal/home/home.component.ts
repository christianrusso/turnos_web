import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService } from "../../clinic/services/home.service";
import { busqueda } from "../../global/busqueda";
import { BaseComponent } from "../../clinic/core/base.component";
import { RegisterLoginService } from "../../clinic/services/register-login.service";
import { BusquedaService } from "../../clinic/services/busqueda.service";

declare const $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [HomeService, RegisterLoginService, BusquedaService]
})
export class HomeComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  public buscador;
  public register;
  public login;
  public user;
  public token  ;
  public busqueda: string;
  public identity;
  public errorMensagePassword;
  public errorMensageEmail;
  public successMensage;
  public cities;
  public redirectTo;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _HomeService: HomeService,
    private _RegisterLoginService: RegisterLoginService,
    private _BusquedaService: BusquedaService
  ) {
    super();
    this.busqueda = busqueda.categoria;
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script2.js");
  }

  ngOnInit() {
    $("header").hide();
    this.getCities();
    if(localStorage.getItem("tokenTurnos")){
      this.token=localStorage.getItem("tokenTurnos");
    }

    this._route.params.subscribe(params => {
      let id = +params["id"];
      this.redirectTo=params["id"];
      $("select2 option[value=" + id + "]").attr("selected", true);
    });
    this.identity = this._RegisterLoginService.getToken();
    this.buscador = {
      categoria: "",
      fecha: "",
      ubicacion: ""
    };
    this.register = {
      email: "",
      password: "",
      passwordSecond: ""
    };
    this.login = {
      email: "",
      password: ""
    };
  }
  //Citys
  public getCities() {
    this._BusquedaService.getCities().subscribe(
      response => {
        this.cities = response;
      },
      error => {
        // Manejar errores
      }
    );
  }
  onSubmit() {
    localStorage.setItem("busqueda", JSON.stringify(this.buscador));
    switch (parseInt(this.redirectTo )) {
      case 1:
      return this._router.navigate(["clinica/buscador"]);
      case 2:
       return this._router.navigate(["peluqueria/buscador"]);
      default:
      return this._router.navigate(["clinica/buscador"]);
    }
    //window.location.href = '/buscador';
  }

  onRegister() {
    if (this.register.email != "") {
      this.errorMensageEmail = "";

      if (
        this.register.password == this.register.passwordSecond &&
        this.register.password != "" &&
        this.register.password.length > 8
      ) {
        this._RegisterLoginService.onRegister(this.register).subscribe(
          response => {
          },
          error => {
            // Manejar errores
          }
        );
        this.successMensage = "Cuentra creada con exito";
        $(".modulo-inicio").css("display", "block");
        $(".modulo-registro").css("display", "none");
        $("#d-ini2").addClass("activeInside");
        $("#d-reg2").removeClass("activeInside");
      } else {
        this.errorMensagePassword =
          "Contraseña demasiada corta o las contraseñas no coinciden";
      }
    } else {
      this.errorMensageEmail = "Complete los campos";
    }
  }
  onLogin() {
    this._RegisterLoginService.onLogin(this.login).subscribe(
      response => {
        localStorage.setItem("tokenTurnos", JSON.stringify(response));
        this.identity = this._RegisterLoginService.getToken();
        this.user = response.logo;
        $(".modal-gral").fadeOut();
      },
      error => {
        // Manejar errores
      }
    );
  }

  logout() {
    this._RegisterLoginService.onLogout().subscribe(
      response => {
      },
      error => {
        // Manejar errores
      }
    );
    localStorage.removeItem("tokenTurnos");
    window.location.href = "";
  }

  lugar(id) {
    this.buscador.ubicacion = id.value;
  }
  categoria(id) {
    this.buscador.categoria = id.value;
    this.redirectTo=id.value;
  }
}
