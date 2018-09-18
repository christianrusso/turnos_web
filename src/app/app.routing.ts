import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './clinicaFolder/components/home/home.component';
import { IndexComponent } from './clinicaFolder/components/index/index.component';
import { BuscadorComponent } from './clinicaFolder/components/buscador/buscador.component';
import { AyudaComponent } from './clinicaFolder/components/ayuda/ayuda.component';
import { NosotrosComponent } from './clinicaFolder/components/nosotros/nosotros.component';
import { VerMapaComponent } from './clinicaFolder/components/ver-mapa/ver-mapa.component';
import { ReservaComponent } from './clinicaFolder/components/reserva/reserva.component';
import { ReservaExitoComponent } from './clinicaFolder/components/reserva-exito/reserva-exito.component';
import { MisturnosComponent } from './clinicaFolder/components/misturnos/misturnos.component';
import { CargaclinicaComponent } from './clinicaFolder/components/cargaclinica/cargaclinica.component';

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
  { path: 'clinica', component: CargaclinicaComponent },


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
