import { Component, OnInit, AfterViewInit } from "@angular/core";
import { BaseComponent } from "./clinic/core/base.component";
import { RegisterLoginService } from "./clinic/services/register-login.service";
// import { AuthService } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { MiturnoService } from "./clinic/services/miturno.service";

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

declare const $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [RegisterLoginService,MiturnoService]
})
export class AppComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  title = "app";
  public register;
  public login;
  public identity=null;
  public user;
  public errorMensagePassword;
  public errorMensageEmail;
  public successMensage;
 
  public alertTurn=[];

  public filter = {
    StartDate: new Date(),
    EndDate: new Date()
  };
  constructor(private _RegisterLoginService: RegisterLoginService,private authService: AuthService,  private socialAuthService: AuthService,   private _MiTurno: MiturnoService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script2.js");
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // Now sign-in with userData
        // ...
        this._RegisterLoginService.onRegisterFacebook({"Email":userData.email,"UserId":userData.id}).subscribe(
          response => {
            localStorage.setItem("tokenTurnos", JSON.stringify(response));
            this.identity = this._RegisterLoginService.getToken();
            this.user = response.logo;
            $(".modal-gral").fadeOut();
            location.reload();

          },
          error => {
            // Manejar errores
          }
        );

      }
    );
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
      password: "",
    };
    if(this._RegisterLoginService.getToken()){
      this.getTurns();

    }
  }
  public getTurns() {
    this._MiTurno.GetWeekForClient(this.filter).subscribe(
      response => {
        var clinics = response.clinic_GetWeekForClient;
        var hairdress = response.hairdressing_GetWeekForClient;
          clinics.forEach(element => {
            if (element.appointments.length > 0) {
              element.appointments.forEach(appoint => {
                if (appoint.state == 1) {
                  var now = new Date().getTime();
                  var to = new Date(appoint.dateTime).getTime();
                  appoint.diffToAppointment = Math.round((to-now) / 60000);
                }
                this.alertTurn.push(appoint);
              })
            }
          })
          hairdress.forEach(element => {
            if (element.appointments.length > 0) {
              element.appointments.forEach(appoint => {
                if (appoint.state == 1) {
                  var now = new Date().getTime();
                  var to = new Date(appoint.dateTime).getTime();
                  appoint.diffToAppointment = Math.round((to-now) / 60000);
                }
                this.alertTurn.push(appoint);
              })
            }
          })

      },
      error => {
        // Manejar errores
      }
    );
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
  public errorLogin;
  onLogin() {
    this._RegisterLoginService.onLogin(this.login).subscribe(
      response => {
        localStorage.setItem("tokenTurnos", JSON.stringify(response));
        this.identity = this._RegisterLoginService.getToken();
        this.user = response.logo;
        $(".modal-gral").fadeOut();
        this.getTurns();
        this.errorLogin=null;

        location.reload();

      },
      error => {
        // Manejar errores
        this.errorLogin="Email o password incorrecto";
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
    location.reload();

  }

}
