import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../shared/model/usuario';
import { DetallePresupuestoService } from 'src/app/services/detalle-presupuesto.service';
import { DetallePresupuesto } from 'src/app/shared/model/detalle-presupuesto';

@Component({
  selector: 'bi-reporte-estado-facturas',
  templateUrl: './reporte-estado-facturas.component.html',
  styleUrls: []
})
export class ReporteEstadoFacturasComponent implements OnInit {

    lstCodigoCatalogoMes: Catalogo[] = [];
    lstUsuariosRegistrados: Usuario[] = [];
    lstFacturas: DetallePresupuesto[] = [];
    mes: Catalogo;
    usuarioFiltro: Usuario;

  constructor( private catalogoService: CatalogoService,
    private usuarioService: UsuarioService, 
    private detallePresupuestoService: DetallePresupuestoService ) { }

  ngOnInit() {
    this.mes = {};
    this.usuarioFiltro = {};
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    this.catalogoService.buscarCatalogos(595).subscribe( res => {
      this.lstCodigoCatalogoMes = res;
  },
      err => {
          console.error( err );
      } );

      this.usuarioService.cargarUsuariosRegistrados().subscribe( res => {
        this.lstUsuariosRegistrados = res;
    },
        err => {
            console.error( err );
        } );
  }

  cargarFacturas() {
    console.log(this.mes);
    console.log(this.usuarioFiltro);
    this.detallePresupuestoService.cargarFacturasFiltroMesUsuarioRegistro(this.mes.cpIdCatalogo, this.usuarioFiltro.usIdUsuario)
    .subscribe( res => {
      this.lstFacturas = res;
    },
      err => {
          console.error( err );
      } );
  }

}
