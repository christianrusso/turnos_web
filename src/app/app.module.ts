import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { routing, appRoutingProviders, appRoutes } from "./app.routing";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./componentsGlobal/home/home.component";
import { IndexComponent } from "./componentsGlobal/index/index.component";
import { Select2Module } from "ng2-select2";
import { FormsModule } from "@angular/forms";
import { BuscadorComponent } from "./clinic/components/buscador/buscador.component";
import { AyudaComponent } from "./clinic/components/ayuda/ayuda.component";

//loading
import {
  NgLoadingSpinnerModule,
  NgLoadingSpinnerInterceptor
} from "ng-loading-spinner";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NosotrosComponent } from "./clinic/components/nosotros/nosotros.component";
import { VerMapaComponent } from "./clinic/components/ver-mapa/ver-mapa.component";
import { ReservaComponent } from "./clinic/components/reserva/reserva.component";
import { NavComponent } from "./clinic/components/nav/nav.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoUtilsModule } from "./clinic/demo-utils/module";
import { registerLocaleData } from "@angular/common";
import { CommonModule } from "@angular/common";

import localeEs from "@angular/common/locales/es";

registerLocaleData(localeEs, "es");

import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressHttpModule } from "@ngx-progressbar/http";
import { RouterModule } from "@angular/router";
import { ReservaExitoComponent } from "./clinic/components/reserva-exito/reserva-exito.component";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { MisturnosComponent } from "./clinic/components/misturnos/misturnos.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap/modal/modal.module";
import { CargaclinicaComponent } from "./clinic/components/cargaclinica/cargaclinica.component";
import { AgmCoreModule } from "@agm/core";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { BuscadorPeluqueriaComponent } from "./peluqueria/components/buscador-peluqueria/buscador-peluqueria.component";
import { CalendarModule } from 'angular-calendar';

let config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("281832435873706")
   }
   //,
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  // }
]);
 
export function provideConfig() {
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    BuscadorComponent,
    AyudaComponent,
    NosotrosComponent,
    VerMapaComponent,
    ReservaComponent,
    NavComponent,
    ReservaExitoComponent,
    MisturnosComponent,
    CargaclinicaComponent,
    BuscadorPeluqueriaComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    DemoUtilsModule,
    BrowserModule,
    routing,
    HttpModule,
    Select2Module,
    FormsModule,
    HttpClientModule,
    NgLoadingSpinnerModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    SocialLoginModule,
 
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCeS0Tku62WXG03D8NKXgMxA6RNuBKbrSI",
      libraries: ["places"]
    })
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: provideConfig,
      useClass: NgLoadingSpinnerInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
