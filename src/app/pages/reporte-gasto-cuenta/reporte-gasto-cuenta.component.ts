import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CabeceraPresupuesto } from '../../shared/model/cabecera-presupuesto';
import { CabeceraPresupuestoService } from '../../services/cabecera-presupuesto.service';
import { ReporteConsumoCuenta } from '../../shared/model/reporte-consumo-cuenta';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { Catalogo } from '../../shared/model/catalogo';

@Component({
  selector: 'bi-reporte-gasto-cuenta',
  templateUrl: './reporte-gasto-cuenta.component.html',
  styles: []
})
export class ReporteGastoCuentaComponent implements OnInit {

  lstReporteConsumoCuenta: ReporteConsumoCuenta[] = [];
  config: PerfectScrollbarConfigInterface = {};
  lstCodigoCatalogoTipoGasto: Catalogo[] = [];
  tipoGasto: Catalogo;

  constructor(private cabeceraPresupuestoService: CabeceraPresupuestoService,
    private catalogoService: CatalogoService) { }

  ngOnInit() {

    // tipo de gasto opex - capex
    this.tipoGasto = {};
    this.catalogoService.buscarCatalogos(408).subscribe(res => {
      this.lstCodigoCatalogoTipoGasto = res;
    },
      err => {
        console.error(err);
      });

  }

  buscar() {
    console.log(this.tipoGasto.cpIdCatalogo);
    this.cabeceraPresupuestoService.consultaConsumoPresupuesto(this.tipoGasto.cpIdCatalogo).subscribe(res => {
      this.lstReporteConsumoCuenta = res;
      console.log(this.lstReporteConsumoCuenta);
    },
      err => {
        console.error(err);
      });
  }

}
