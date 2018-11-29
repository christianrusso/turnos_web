import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './componentsGlobal/home/home.component';
import { IndexComponent } from './componentsGlobal/index/index.component';
import { BuscadorComponent } from './clinic/components/buscador/buscador.component';
import { AyudaComponent } from './clinic/components/ayuda/ayuda.component';
import { NosotrosComponent } from './clinic/components/nosotros/nosotros.component';
import { VerMapaComponent } from './clinic/components/ver-mapa/ver-mapa.component';
import { ReservaComponent } from './clinic/components/reserva/reserva.component';
import { InfoClinicaComponent } from './clinic/components/infoclinica/infoclinica.component';
import { ReservaExitoComponent } from './clinic/components/reserva-exito/reserva-exito.component';
import { MisturnosComponent } from './clinic/components/misturnos/misturnos.component';
import { CargaclinicaComponent } from './clinic/components/cargaclinica/cargaclinica.component';
import { BuscadorPeluqueriaComponent } from "./peluqueria/components/buscador-peluqueria/buscador-peluqueria.component";
import { FavoritosComponent } from './clinic/components/favoritos/favoritos.component';
import { PreguntasFrecuentesComponent } from './clinic/components/preguntas-frecuentes/preguntas-frecuentes.component';

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'clinica/buscador', component: BuscadorComponent,   runGuardsAndResolvers: 'always',},
  { path: 'ayuda', component: AyudaComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'ver-mapa', component: VerMapaComponent },
  { path: 'reserva/:id', component: ReservaComponent,   runGuardsAndResolvers: 'always'},
  { path: 'clinica/infoclinica/:id', component: InfoClinicaComponent, runGuardsAndResolvers: 'always'},
  { path: 'exito', component: ReservaExitoComponent },
  { path: 'misturnos', component: MisturnosComponent },
  { path: 'carga', component: CargaclinicaComponent },
  { path: 'peluqueria/buscador', component: BuscadorPeluqueriaComponent},
  { path: 'favoritos', component: FavoritosComponent},
  { path: 'preguntasFrecuentes', component: PreguntasFrecuentesComponent},


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
