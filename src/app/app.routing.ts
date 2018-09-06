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
import { ReservaExitoComponent } from './components/reserva-exito/reserva-exito.component';
import { MisturnosComponent } from './components/misturnos/misturnos.component';

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'buscador', component: BuscadorComponent,   runGuardsAndResolvers: 'always',},
  { path: 'ayuda', component: AyudaComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'ver-mapa', component: VerMapaComponent },
  { path: 'reserva/:id', component: ReservaComponent,   runGuardsAndResolvers: 'always'},
  { path: 'exito', component: ReservaExitoComponent },
  { path: 'misturnos', component: MisturnosComponent },


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
