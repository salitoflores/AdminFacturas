import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CabeceraPresupuesto } from '../../shared/model/cabecera-presupuesto';
import { CabeceraPresupuestoService } from '../../services/cabecera-presupuesto.service';
import { ReporteConsumoCuenta } from '../../shared/model/reporte-consumo-cuenta';

@Component({
  selector: 'bi-reporte-gasto-cuenta',
  templateUrl: './reporte-gasto-cuenta.component.html',
  styles: []
})
export class ReporteGastoCuentaComponent implements OnInit {

    lstReporteConsumoCuenta: ReporteConsumoCuenta[] = [];
    config: PerfectScrollbarConfigInterface = {};

  constructor(private cabeceraPresupuestoService: CabeceraPresupuestoService) { }

  ngOnInit() {
      this.cabeceraPresupuestoService.consultaConsumoPresupuesto().subscribe( res => {
          this.lstReporteConsumoCuenta = res;
          console.log(this.lstReporteConsumoCuenta);
      },
          err => {
              console.error( err );
          } );
  }

}
