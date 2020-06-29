import { Component, OnInit } from '@angular/core';
import { DetallePresupuesto } from '../../shared/model/detalle-presupuesto';
import { DetallePresupuestoService } from '../../services/detalle-presupuesto.service';
import { obtenerIdUsuario } from 'src/app/shared/util/seguridad-acceso';
import swal from 'sweetalert';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bi-registro-ahorros',
  templateUrl: './registro-ahorros.component.html',
  styleUrls: []
})
export class RegistroAhorrosComponent implements OnInit {

  detallePresupuesto: DetallePresupuesto;
  lstCodigoCatalogoMes: Catalogo[] = [];

  constructor(private detallePresupuestoService: DetallePresupuestoService,
    private catalogoService: CatalogoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.detallePresupuesto = {};
    this.detallePresupuesto.idCabecera = this.route.snapshot.queryParams['id'];

    //cargar mes
    this.catalogoService.buscarCatalogos(595).subscribe(res => {
      this.lstCodigoCatalogoMes = res;
    },
      err => {
        console.error(err);
      });
  }

  enviarDatosAhorro() {
    this.detallePresupuesto.dpTipoDocumento = 3;
    let idUsuario = obtenerIdUsuario();
    this.detallePresupuesto.idUsuario = idUsuario;
    this.detallePresupuesto.dpTipoDocumento = 3; //tipo documento 3 (ahorro)
    console.log(this.detallePresupuesto);
    this.detallePresupuestoService.guardarDatosAhorro(this.detallePresupuesto).subscribe(
      res => {
        swal({ title: 'OK!', text: 'Registro exitoso', icon: 'success' });
        this.detallePresupuesto = {};
      },
      err => {
        swal({ title: 'Error!', text: err.error.descripcion, icon: 'error' });
      }
    );
  }
}
