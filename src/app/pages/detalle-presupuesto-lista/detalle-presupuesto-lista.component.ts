import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { DetallePresupuestoService } from '../../services/detalle-presupuesto.service';
import { DetallePresupuesto } from '../../shared/model/detalle-presupuesto';
import { Router } from '@angular/router';

@Component({
  selector: 'bi-detalle-presupuesto-lista',
  templateUrl: './detalle-presupuesto-lista.component.html',
  styles: []
})
export class DetallePresupuestoListaComponent implements OnInit {

    id: number;
    mes: Catalogo;
    lstCodigoCatalogoMes: Catalogo[] = [];
    lstDetallePresupuestoFiltrado: DetallePresupuesto[] = [];

  constructor(private route: ActivatedRoute, private catalogoService: CatalogoService,
          private detallePresupuestoService: DetallePresupuestoService, private router: Router) { }

  ngOnInit() {
      this.mes = {};
      this.id = this.route.snapshot.queryParams['id'];

      this.catalogoService.buscarCatalogos(595).subscribe( res => {
          this.lstCodigoCatalogoMes = res;
      },
          err => {
              console.error( err );
          } );
  }

  buscarDetallePresupuestoFiltroCabeceraMes() {
      this.detallePresupuestoService.buscarDetalleFiltroCabeceraMes(this.id, this.mes.cpIdCatalogo).subscribe( res => {
          this.lstDetallePresupuestoFiltrado = res;
      },
          err => {
              console.error( err );
          } );
  }

  modificarDetalle( idDetalle: number ) {
      this.router.navigate( ['home/detalle-presupuesto'], { queryParams: { idDetalle: idDetalle } } );
  }

  regresar() {
      this.router.navigate( ['home/cabecera-presupuesto-lista'], { queryParams: { idCabecera: this.id } } );
  }

}
