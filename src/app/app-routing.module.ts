import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CatalogoListaComponent } from './pages/catalogo-lista/catalogo-lista.component';
import { CabeceraPresupuestoComponent } from './pages/cabecera-presupuesto/cabecera-presupuesto.component';
import { CabeceraPresupuestoListaComponent } from './pages/cabecera-presupuesto-lista/cabecera-presupuesto-lista.component';
import { DetallePresupuestoComponent } from './pages/detalle-presupuesto/detalle-presupuesto.component';
import { LoginComponent } from './template/login/login.component';
import { PrincipalComponent } from './template/principal/principal.component';
import { AuthGuard } from './shared/util/auth-guard';
import { DetallePresupuestoListaComponent } from './pages/detalle-presupuesto-lista/detalle-presupuesto-lista.component';
import { ReporteGastoCuentaComponent } from './pages/reporte-gasto-cuenta/reporte-gasto-cuenta.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'home',
      component: PrincipalComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
            { path: 'catalogo', component: CatalogoComponent },
            { path: 'listar-catalogo', component: CatalogoListaComponent },
            { path: 'cabecera-presupuesto', component: CabeceraPresupuestoComponent },
            { path: 'cabecera-presupuesto-lista', component: CabeceraPresupuestoListaComponent },
            { path: 'detalle-presupuesto', component: DetallePresupuestoComponent },
            { path: 'detalle-presupuesto-lista', component: DetallePresupuestoListaComponent },
            { path: 'reporte-gasto-cuenta', component: ReporteGastoCuentaComponent },
      ]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
