import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../shared/model/catalogo';
import { DetallePresupuestoService } from '../../services/detalle-presupuesto.service';
import { obtenerIdArea } from '../../shared/util/seguridad-acceso';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert';

@Component({
  selector: 'bi-generar-archivo-ci',
  templateUrl: './generar-archivo-ci.component.html',
  styleUrls: []
})
export class GenerarArchivoCIComponent implements OnInit {

  fechaAxu: Date;
  mesCatalogo: Catalogo;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private catalogoService: CatalogoService,
    private detalleService: DetallePresupuestoService) { }

  ngOnInit() {
    this.mesCatalogo = {};
    this.catalogoService.buscarMesFechaActual().subscribe(res => {
      this.mesCatalogo = res;
      console.log("Mes: " + this.mesCatalogo.cpIdCatalogo);
    },
      err => {
        console.error(err);
      });
  }

  generarArchivo() {
    this.blockUI.start("Generando archivo...");
    const idArea = obtenerIdArea();
    console.log("Area: " + idArea);
    this.detalleService.generarArchivoCI(idArea, this.mesCatalogo.cpIdCatalogo, this.mesCatalogo.cpCodigoCatalogo.substring(0, 2)).subscribe(
      data => {
        console.log(data);
        let auxFile = data;
        console.log(auxFile);
        const blob = new Blob([auxFile], { type: 'application/zip' });
        if (blob.size > 0) {
          const filename = 'Reporte Control Interno.zip';
          saveAs(blob, filename);
          this.blockUI.stop();
        } else {
          this.blockUI.stop();
          swal({ title: 'Warning!', text: 'No existes documentos disponibles', icon: 'info' });
        }

      }, error => {
        this.blockUI.stop();
        console.log(error);
        console.log('Error downloading the file.');
      }
    );
  }

}
