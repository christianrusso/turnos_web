import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { routing, appRoutingProviders, appRoutes } from "./app.routing";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { IndexComponent } from "./components/index/index.component";
import { Select2Module } from "ng2-select2";
import { FormsModule } from "@angular/forms";
import { BuscadorComponent } from "./components/buscador/buscador.component";
import { AyudaComponent } from "./components/ayuda/ayuda.component";

//loading
import {
  NgLoadingSpinnerModule,
  NgLoadingSpinnerInterceptor
} from "ng-loading-spinner";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NosotrosComponent } from "./components/nosotros/nosotros.component";
import { VerMapaComponent } from "./components/ver-mapa/ver-mapa.component";
import { ReservaComponent } from "./components/reserva/reserva.component";
import { NavComponent } from "./components/nav/nav.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "angular-calendar";
import { DemoUtilsModule } from "./demo-utils/module";
import { registerLocaleData } from "@angular/common";
import { CommonModule } from "@angular/common";

import localeEs from "@angular/common/locales/es";

registerLocaleData(localeEs, "es");

import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressHttpModule } from "@ngx-progressbar/http";
import { RouterModule } from "@angular/router";
import { ReservaExitoComponent } from "./components/reserva-exito/reserva-exito.component";

import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { MisturnosComponent } from "./components/misturnos/misturnos.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap/modal/modal.module";
import { CargaclinicaComponent } from "./components/cargaclinica/cargaclinica.component";
import { AgmCoreModule } from "@agm/core";

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
    CargaclinicaComponent
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
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCyCX2-eJssZgvNucxJBPMKYpyTTaVa610",
      libraries: ["places"]
    })
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgLoadingSpinnerInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
