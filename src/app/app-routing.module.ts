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
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RolComponent } from './pages/rol/rol.component';
import { AccionComponent } from './pages/accion/accion.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AprobacionComponent } from './pages/aprobacion/aprobacion.component';
import { ReporteEstadoFacturasComponent } from './pages/reporte-estado-facturas/reporte-estado-facturas.component';
import { GenerarArchivoCIComponent } from './pages/generar-archivo-ci/generar-archivo-ci.component';
import { RegistroAhorrosComponent } from './pages/registro-ahorros/registro-ahorros.component';
import { RegistroProveedorComponent } from './pages/registro-proveedor/registro-proveedor.component';
import { ContratoComponent } from './pages/contrato/contrato.component';
import { ParametrosDiferidosComponent } from './pages/parametros-diferidos/parametros-diferidos.component';
import { FacturasDiferidasComponent } from './pages/facturas-diferidas/facturas-diferidas.component';

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
            { path: 'usuario', component: UsuarioComponent },
            { path: 'rol', component: RolComponent },
            { path: 'accion', component: AccionComponent },
            { path: 'menu', component: MenuComponent },
            { path: 'aprobacion', component: AprobacionComponent },
            { path: 'generar-archivo-ci', component: GenerarArchivoCIComponent },
            { path: 'cabecera-presupuesto', component: CabeceraPresupuestoComponent },
            { path: 'cabecera-presupuesto-lista', component: CabeceraPresupuestoListaComponent },
            { path: 'detalle-presupuesto', component: DetallePresupuestoComponent },
            { path: 'detalle-presupuesto-lista', component: DetallePresupuestoListaComponent },
            { path: 'reporte-gasto-cuenta', component: ReporteGastoCuentaComponent },
            { path: 'reporte-estado-facturas', component: ReporteEstadoFacturasComponent },
            { path: 'registro-proveedor', component: RegistroProveedorComponent },
            { path: 'registro-ahorros', component: RegistroAhorrosComponent},
            { path: 'contrato', component: ContratoComponent},
            { path: 'parametros-diferidos', component: ParametrosDiferidosComponent },
            { path: 'facturas-diferidas', component : FacturasDiferidasComponent}
      ]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
