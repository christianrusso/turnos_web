import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './componets/home/home.component';
import { Paso2Component } from './componets/paso2/paso2.component';


  const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'paso2', component: Paso2Component},

 
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
