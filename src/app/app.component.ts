import { Component, OnInit, AfterViewInit } from "@angular/core";
import { BaseComponent } from "./clinic/core/base.component";
import { RegisterLoginService } from "./clinic/services/register-login.service";
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
 

declare const $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [RegisterLoginService]
})
export class AppComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  title = "app";
  public register;
  public login;
  public identity;
  public user;
  public errorMensagePassword;
  public errorMensageEmail;
  public successMensage;

  constructor(private _RegisterLoginService: RegisterLoginService,private authService: AuthService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script2.js");
  }
  ngOnInit() {
    this.identity = this._RegisterLoginService.getToken();

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
            console.log(response);
          },
          error => {
            // Manejar errores
          }
        );
        this.successMensage = "Cuentra creada con exito";
        $(".modulo-inicio").css("display", "block");
        $(".modulo-registro").css("display", "none");
        $("#d-ini").addClass("activeInside");
        $("#d-reg").removeClass("activeInside");
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
        console.log(response);
      },
      error => {
        // Manejar errores
      }
    );
    localStorage.removeItem("tokenTurnos");
    window.location.href = "/buscador";
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.register.email=userData.email;
        this.register.password=userData.authToken;
        this.register.passwordSecond=userData.authToken;

        console.log(this.login);
        this._RegisterLoginService.onRegister(this.register).subscribe(
          response => {
            console.log(response);
          },
          error => {
            // Manejar errores
          }
        );
        
        console.log(" sign in data : " , userData);
        // Now sign-in with userData
        // ...
            
      }
    );
  }
}
