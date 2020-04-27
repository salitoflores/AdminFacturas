import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { DetallePresupuestoService } from '../../services/detalle-presupuesto.service';
import { DetallePresupuesto } from '../../shared/model/detalle-presupuesto';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { ImFactura } from '../../shared/model/im-factura';
import swal from 'sweetalert';
import { obtenerIdArea } from '../../shared/util/seguridad-acceso';

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
    imgFactura: ImFactura = {};


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

  verFactura( id: number ) {
      this.detallePresupuestoService.buscarFactura( id ).subscribe(
              data => {
                  console.log(data);
                  this.imgFactura.dpImgFactura = data;
                  console.log(this.imgFactura.dpImgFactura);
                   const blob = new Blob( [this.imgFactura.dpImgFactura], { type: 'application/pdf' });
                   const url = window.URL.createObjectURL(blob);
                  window.open(url, 'Factura');
              }, error => {
                  console.log(error);
                  console.log('Error downloading the file.');
              }
      );
  }
  
  verXml( id: number ) {
      this.detallePresupuestoService.buscarXml( id ).subscribe(
              data => {
                  console.log(data);
                  this.imgFactura.dpImgFactura = data;
                  console.log(this.imgFactura.dpImgFactura);
                   const blob = new Blob( [this.imgFactura.dpImgFactura], { type: 'application/xml' });
                   if (blob.size>0) {
                    const filename = 'facturaXml.xml';
                   saveAs(blob, filename);
                   } else {
                    swal( { title: 'Warning!', text: 'No existe archivo cargado', icon: 'info' } );
                   }
                   
              }, error => {
                  console.log(error);
                  console.log('Error downloading the file.');
              }
      );
  }

  verAnexos( id: number ) {
      this.detallePresupuestoService.buscarAnexos( id ).subscribe(
              data => {
                  console.log(data);
                  this.imgFactura.dpImgFactura = data;
                  console.log(this.imgFactura.dpImgFactura);
                   const blob = new Blob( [this.imgFactura.dpImgFactura], { type: 'application/zip' });
                   if (blob.size>0) {
                    const filename = 'Soporte.zip';
                   saveAs(blob, filename);
                   } else {
                    swal( { title: 'Warning!', text: 'No existe archivo cargado', icon: 'info' } );
                   }
              }, error => {
                  console.log(error);
                  console.log('Error downloading the file.');
              }
      );
  }
}
