import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { BuscadorComponent } from './components/buscador/buscador.component';


  const appRoutes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'home/:id', component: HomeComponent},
  {path: 'buscador', component: BuscadorComponent},

 
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
