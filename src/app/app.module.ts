import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from 'primeng/calendar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { PickListModule } from 'primeng/picklist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { HeaderComponent } from './template/header/header.component';
import { ContentComponent } from './template/content/content.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { CabeceraPresupuestoComponent } from './pages/cabecera-presupuesto/cabecera-presupuesto.component';
import { CatalogoListaComponent } from './pages/catalogo-lista/catalogo-lista.component';
import { DetallePresupuestoComponent } from './pages/detalle-presupuesto/detalle-presupuesto.component';
import { CabeceraPresupuestoListaComponent } from './pages/cabecera-presupuesto-lista/cabecera-presupuesto-lista.component';
import { LoginComponent } from './template/login/login.component';
import { PrincipalComponent } from './template/principal/principal.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { GeneralDirectivesModule } from './components/directives/general-directives.module';
import { DetallePresupuestoListaComponent } from './pages/detalle-presupuesto-lista/detalle-presupuesto-lista.component';
import { ReporteGastoCuentaComponent } from './pages/reporte-gasto-cuenta/reporte-gasto-cuenta.component';
import { DatePickerI18n } from './date-picker-i18n';
import { httpIntecerptorsProviders } from './shared/interceptor';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RolComponent } from './pages/rol/rol.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AccionComponent } from './pages/accion/accion.component';
import { AprobacionComponent } from './pages/aprobacion/aprobacion.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    FooterComponent,
    CabeceraPresupuestoComponent,
    CatalogoListaComponent,
    DetallePresupuestoComponent,
    CabeceraPresupuestoListaComponent,
    LoginComponent,
    PrincipalComponent,
    ErrorsComponent,
    DetallePresupuestoListaComponent,
    ReporteGastoCuentaComponent,
    UsuarioComponent,
    RolComponent,
    MenuComponent,
    AccionComponent,
    AprobacionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CalendarModule,
    GeneralDirectivesModule,
    PickListModule,
    HttpModule
],
  providers: [{
      provide: NgbDatepickerI18n,
      useClass: DatePickerI18n
    },
    {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    httpIntecerptorsProviders
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
