import { Routes } from '@angular/router';
import { CalculadoraPrestamos } from './components/calculadora-prestamos/calculadora-prestamos';
import { FinanzasPersonalesComponent } from './finanzas-personales/finanzas-personales';
import { GraficosComponent } from './graficos/graficos';

export const routes: Routes = [
  { path: '', redirectTo: 'calculadora', pathMatch: 'full' },
  { path: 'calculadora', component: CalculadoraPrestamos },
  { path: 'finanzas', component: FinanzasPersonalesComponent },
  { path: 'graficos', component: GraficosComponent },
];