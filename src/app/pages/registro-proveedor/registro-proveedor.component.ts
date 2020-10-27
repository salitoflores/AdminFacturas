import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Proveedor } from '../../shared/model/proveedor';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import swal from 'sweetalert';
import { ImFactura } from '../../shared/model/im-factura';
import { ProveedorService } from '../../services/proveedor.service';


@Component({
  selector: 'bi-registro-proveedor',
  templateUrl: './registro-proveedor.component.html',
  styleUrls: []
})
export class RegistroProveedorComponent implements OnInit {

  //creacion de proveedor
  flagCrear: boolean;
  proveedor: Proveedor;
  lstPaises: Catalogo[] = [];
  lstAreaResponsable: Catalogo[] = [];
  lstCriticidad: Catalogo[] = [];
  proveedorCatalogo: Catalogo;
  model = {
    fechaInicioFormulario: new Date(), fechaFinFormulario: new Date(),
    fechaInicioCertificado: new Date(), fechaFinCertificado: new Date()
  };
  flagFormulario: boolean;
  flagCertificado: boolean;
  imagenFormulario: File;
  imagenCertificado: File;
  auxFile: ImFactura = {};
  flagFormularios: boolean;
  pais: Catalogo;
  paisBusqueda: Catalogo;

  //listado de proveedores
  lstProveedor: Proveedor[] = [];
  flagListado: boolean;

  constructor(
    private catalogoService: CatalogoService,
    private proveedorService: ProveedorService,
    private router: Router) { }

  ngOnInit() {
    this.inicializarObjetos();
  }

  inicializarObjetos() {

    //cargar lista de Proveedores
    this.proveedorService.cargarListaProveedores().subscribe(res => {
      this.lstProveedor = res;
      //console.log(this.lstProveedor);
    },
      err => {
        console.error("Error al cargar Lista Proveedores");
      });

    this.flagCrear = false;
    this.flagListado = true;
    this.flagFormularios = false;
    this.proveedor = {};
    this.proveedorCatalogo = {};
    this.pais = {};
    this.paisBusqueda = {};
    this.flagFormulario = false;
    this.flagCertificado = false;
    //catalogo paises
    this.catalogoService.buscarCatalogoPorDescripcion('PAIS').subscribe(res => {
      let idPadrePais = res;
      this.catalogoService.buscarCatalogos(idPadrePais.cpIdCatalogo).subscribe(res => {
        this.lstPaises = res;
      },
        err => {
          console.error("Error al cargar Paises");
        });

    },
      err => {
        console.error("Error al cargar FlagPadre de Paises");
      });
    //catalogo area responsable
    this.catalogoService.buscarCatalogoPorDescripcion('AREA').subscribe(res => {
      let idPadrePais = res;
      this.catalogoService.buscarCatalogos(idPadrePais.cpIdCatalogo).subscribe(res => {
        this.lstAreaResponsable = res;
      },
        err => {
          console.error("Error al cargar Area Responsable");
        });
    },
      err => {
        console.error("Error al cargar FlagPadre de Area Responsble");
      });
    // catalogo Criticidad
    this.catalogoService.buscarCatalogoPorDescripcion('CRITICIDAD').subscribe(res => {
      let idPadrePais = res;
      this.catalogoService.buscarCatalogos(idPadrePais.cpIdCatalogo).subscribe(res => {
        this.lstCriticidad = res;
      },
        err => {
          console.error("Error al cargar Criticidad");
        });
    },
      err => {
        console.error("Error al cargar FlagPadre de Criticidad");
      });
  }

  guardarProveedor() {
    console.log(this.proveedor + ' ' + this.imagenFormulario + ' ' + this.imagenCertificado);
    this.proveedorService.guardarProveedor(this.proveedor, this.imagenFormulario, this.imagenCertificado).subscribe(
      res => {
        swal({ title: 'OK!', text: 'Registro exitoso', icon: 'success' });
        this.inicializarObjetos();
      },
      err => {
        swal({ title: 'Error!', text: err.error.descripcion, icon: 'error' });

      }
    );

  }

  cargarFormulario(files: FileList) {
    if (files.item(0).type === 'application/pdf') {
      //console.log(files.item(0));
      this.imagenFormulario = files.item(0);
    } else {
      swal({ title: 'Error!', text: 'Formato no admitido', icon: 'error' });
    }
  }

  verFormulario(id: number) {
    this.proveedorService.buscarFormulario(id).subscribe(
      data => {
        console.log(data);
        this.auxFile.dpImgFactura = data;
        console.log(this.auxFile.dpImgFactura);
        const blob = new Blob([this.auxFile.dpImgFactura], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, 'Formulario Conozca a su Proveedor');
      }, error => {
        console.log(error);
        console.log('Error downloading the file.');
      }
    );
  }

  cambiarFormulario(id: number) {
    this.flagFormulario = false;
    this.imagenFormulario = null;
  }

  cargarCertificado(files: FileList) {
    if (files.item(0).type === 'application/pdf') {
      //console.log(files.item(0));
      this.imagenCertificado = files.item(0);
    } else {
      swal({ title: 'Error!', text: 'Formato no admitido', icon: 'error' });
    }
  }

  verCertificado(id: number) {
    this.proveedorService.buscarCertificado(id).subscribe(
      data => {
        console.log(data);
        this.auxFile.dpImgFactura = data;
        console.log(this.auxFile.dpImgFactura);
        const blob = new Blob([this.auxFile.dpImgFactura], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, 'Factura');
      }, error => {
        console.log(error);
        console.log('Error downloading the file.');
      }
    );
  }

  cambiarCertificado(id: number) {
    this.flagFormulario = false;
    this.imagenCertificado = null;
  }

  nuevoProveedor() {
    this.inicializarObjetos();
    this.flagCrear = true;
    this.flagListado = false;
  }

  modificarProveedor(accion2: Proveedor) {
    this.nuevoProveedor();
    this.proveedor = accion2;
    this.proveedorCatalogo = {};
    this.proveedorCatalogo.cpIdCatalogo = this.proveedor.idProveedor;
    this.proveedor.idPais = this.proveedor.prIdPais.cpIdCatalogo;
    this.proveedor.idCriticidad = this.proveedor.prIdCriticidad.cpIdCatalogo;
    this.proveedor.idResponsableArea = this.proveedor.prIdResponsableArea.cpIdCatalogo;
    this.verificarPais();
    this.proveedorService.buscarFormulario(this.proveedor.prId).subscribe(
      data => {
        this.auxFile.dpImgFactura = data;
        const aux = new Blob([this.auxFile.dpImgFactura], { type: 'application/pdf' });
        if (aux.size > 0) {
          this.imagenFormulario = this.auxFile.dpImgFactura;
          this.flagFormulario = true;
        } else {
          this.imagenFormulario = null;
        }
      }, err => {
        console.error(err);
      });
    this.proveedorService.buscarCertificado(this.proveedor.prId).subscribe(
      data => {
        this.auxFile.dpImgFactura = data;
        const aux = new Blob([this.auxFile.dpImgFactura], { type: 'application/pdf' });
        if (aux.size > 0) {
          this.imagenCertificado = this.auxFile.dpImgFactura;
          this.flagCertificado = true;
        } else {
          this.imagenCertificado = null;
        }
      }, err => {
        console.error(err);
      });
  }

  consultarContratos(prov: Proveedor) {
    this.router.navigate(['home/contrato'], { queryParams: { idProveedor: prov.idProveedor } });
  }

  verificarPais() {
    this.catalogoService.buscarCatalogoPorId(this.proveedor.idPais).subscribe(res => {
      this.pais = res;
      if (this.pais.cpCodigoCatalogo === "ECUADOR") {
        this.flagFormularios = false;
        this.proveedor.prFechaInicioFormulario = null;
        this.proveedor.prFechaFinFormulario = null;
        this.proveedor.prFechaInicioCertificado = null;
        this.proveedor.prFechaFinCertificado = null;
        this.proveedor.prFormularioConozcaProveedor = null;
        this.proveedor.prCertificadoResidenciaFiscal = null;
        console.log(this.proveedor);
      } else {
        this.flagFormularios = true;
        console.log(this.proveedor);
      }
    },
      err => {
        console.error("Error al cargar Paises");
      });

  }

}
