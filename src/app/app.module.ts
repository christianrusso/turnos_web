import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { Select2Module } from 'ng2-select2';
import { FormsModule } from '@angular/forms';
import { BuscadorComponent } from './components/buscador/buscador.component';

//loading
import { NgLoadingSpinnerModule, NgLoadingSpinnerInterceptor } from 'ng-loading-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    BuscadorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    Select2Module,
    FormsModule,
    HttpClientModule,
    NgLoadingSpinnerModule
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: NgLoadingSpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
