import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { VerMapaComponent } from './components/ver-mapa/ver-mapa.component';
import { ReservaComponent } from './components/reserva/reserva.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'ver-mapa', component: VerMapaComponent },
  { path: 'reserva', component: ReservaComponent },


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
