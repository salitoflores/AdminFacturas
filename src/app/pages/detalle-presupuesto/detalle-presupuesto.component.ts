import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallePresupuesto } from '../../shared/model/detalle-presupuesto';
import { DetallePresupuestoService } from '../../services/detalle-presupuesto.service';
import { CabeceraPresupuesto } from '../../shared/model/cabecera-presupuesto';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import swal from 'sweetalert';
import { obtenerIdUsuario } from '../../shared/util/seguridad-acceso';

@Component( {
    selector: 'bi-detalle-presupuesto',
    templateUrl: './detalle-presupuesto.component.html',
    styles: []
} )
export class DetallePresupuestoComponent implements OnInit {

    aplicaIce: boolean;
    detallePresupuesto: DetallePresupuesto;
    model = { fechaRegistro: new Date(), dpTotalFactura: 0.0 };
    idCabecera: number;
    idDetalle: number;
    lstCodigoCatalogoProveedor: Catalogo[] = [];
    lstCodigoCatalogoFabricante: Catalogo[] = [];
    lstCodigoCatalogoMes: Catalogo[] = [];
    imagenPdf: File;
    imagenXml: File;
    imagenAnexos: File;

    constructor( private route: ActivatedRoute, private detallePresupuestoService: DetallePresupuestoService,
        private catalogoService: CatalogoService ) {

    }

    ngOnInit() {
        // console.log( this.route.snapshot.queryParams );
        this.aplicaIce = false;
        this.detallePresupuesto = {};

        this.idCabecera = this.route.snapshot.queryParams['id'];
        this.idDetalle = this.route.snapshot.queryParams['idDetalle'];


        this.catalogoService.buscarCatalogos( 399 ).subscribe( res => {
            this.lstCodigoCatalogoProveedor = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos( 400 ).subscribe( res => {
            this.lstCodigoCatalogoFabricante = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos( 595 ).subscribe( res => {
            this.lstCodigoCatalogoMes = res;
        },
            err => {
                console.error( err );
            } );

        // inicializar objetos
        this.detallePresupuesto.idCabecera = this.idCabecera;
        if ( this.idDetalle != null ) {
            this.detallePresupuestoService.buscarDetallePresupuestoPorId( this.idDetalle ).subscribe( res => {
                this.detallePresupuesto = res;
                this.model.dpTotalFactura = this.model.dpTotalFactura = +this.detallePresupuesto.dpValorPresupuesto + +this.detallePresupuesto.dpIva;
            },
                err => {
                    console.error( err );
                } );
        }
        this.detallePresupuesto.cpIdProveedor = {};
        this.detallePresupuesto.cpIdFabricante = {};
        this.detallePresupuesto.cpMes = {};
    }

    calcularImpuestos() {
        this.detallePresupuesto.dpIva = Number((+this.detallePresupuesto.dpSubtotal * 0.12).toFixed(2));
        this.detallePresupuesto.dpIce = 0;
        if ( this.detallePresupuesto.cpIdProveedor.cpCampo2 === 'SI' ) {    // retencion y transferencia
            this.detallePresupuesto.dpRetencion = Number((+this.detallePresupuesto.dpSubtotal *
                +this.detallePresupuesto.cpIdProveedor.cpCampo4 / 100).toFixed(2));
            this.detallePresupuesto.dpValorTransferencia = 20;
        } else {
            this.detallePresupuesto.dpRetencion = 0;
            this.detallePresupuesto.dpValorTransferencia = 0;
        }
        if ( this.detallePresupuesto.cpIdProveedor.cpCampo7 === 'SI' ) {  // isd
            this.detallePresupuesto.dpIsd =  Number((+this.detallePresupuesto.dpSubtotal * +this.detallePresupuesto.cpIdProveedor.cpCampo8 / 100).toFixed(2));
        } else {
            this.detallePresupuesto.dpIsd = 0;
        }
        this.detallePresupuesto.dpValorPresupuesto = +this.detallePresupuesto.dpSubtotal + +this.detallePresupuesto.dpRetencion +
            +this.detallePresupuesto.dpValorTransferencia + +this.detallePresupuesto.dpIsd + +this.detallePresupuesto.dpIce;
        this.model.dpTotalFactura = +this.detallePresupuesto.dpValorPresupuesto + +this.detallePresupuesto.dpIva;
    }

    cambioIva() {
        // this.detallePresupuesto.dpIva = +this.detallePresupuesto.dpSubtotal * 0.12;
        // this.detallePresupuesto.dpIce = 0;
        if ( this.detallePresupuesto.cpIdProveedor.cpCampo2 === 'SI' ) {    // retencion y transferencia
            this.detallePresupuesto.dpRetencion = +this.detallePresupuesto.dpSubtotal *
                +this.detallePresupuesto.cpIdProveedor.cpCampo4 / 100;
            this.detallePresupuesto.dpValorTransferencia = 20;
        } else {
            this.detallePresupuesto.dpRetencion = 0;
            this.detallePresupuesto.dpValorTransferencia = 0;
        }
        if ( this.detallePresupuesto.cpIdProveedor.cpCampo7 === 'SI' ) {  // isd
            this.detallePresupuesto.dpIsd = +this.detallePresupuesto.dpSubtotal * +this.detallePresupuesto.cpIdProveedor.cpCampo8 / 100;
        } else {
            this.detallePresupuesto.dpIsd = 0;
        }
        this.detallePresupuesto.dpValorPresupuesto = +this.detallePresupuesto.dpSubtotal + +this.detallePresupuesto.dpRetencion +
            +this.detallePresupuesto.dpValorTransferencia + +this.detallePresupuesto.dpIsd + +this.detallePresupuesto.dpIce;
        this.model.dpTotalFactura = +this.detallePresupuesto.dpValorPresupuesto + +this.detallePresupuesto.dpIva;
    }

    calcularIce() {
        if ( this.aplicaIce === true ) {
            this.detallePresupuesto.dpIce = Number((+this.detallePresupuesto.dpSubtotal * 15 / 100).toFixed(2));
            this.detallePresupuesto.dpIva = Number((( +this.detallePresupuesto.dpSubtotal + +this.detallePresupuesto.dpIce ) * 0.12).toFixed(2));
            this.detallePresupuesto.dpValorPresupuesto = +this.detallePresupuesto.dpSubtotal + +this.detallePresupuesto.dpRetencion +
                +this.detallePresupuesto.dpValorTransferencia + +this.detallePresupuesto.dpIsd + +this.detallePresupuesto.dpIce;
            this.model.dpTotalFactura = +this.detallePresupuesto.dpValorPresupuesto + +this.detallePresupuesto.dpIva;
        }
        if ( this.aplicaIce === false ) {
            this.detallePresupuesto.dpIce = 0;
            this.detallePresupuesto.dpIva = Number((( +this.detallePresupuesto.dpSubtotal ) * 0.12).toFixed(2));
            this.detallePresupuesto.dpValorPresupuesto = +this.detallePresupuesto.dpSubtotal + +this.detallePresupuesto.dpRetencion +
                +this.detallePresupuesto.dpValorTransferencia + +this.detallePresupuesto.dpIsd + +this.detallePresupuesto.dpIce;
            this.model.dpTotalFactura = +this.detallePresupuesto.dpValorPresupuesto + +this.detallePresupuesto.dpIva;
        }
    }

    recalcular() {
        // this.detallePresupuesto.dpIce = +this.detallePresupuesto.dpSubtotal * 15 / 100;
        this.detallePresupuesto.dpIva = Number((( +this.detallePresupuesto.dpSubtotal + +this.detallePresupuesto.dpIce ) * 0.12).toFixed(2));
        this.detallePresupuesto.dpValorPresupuesto = +this.detallePresupuesto.dpSubtotal + +this.detallePresupuesto.dpRetencion +
            +this.detallePresupuesto.dpValorTransferencia + +this.detallePresupuesto.dpIsd + +this.detallePresupuesto.dpIce;
        this.model.dpTotalFactura = +this.detallePresupuesto.dpValorPresupuesto + +this.detallePresupuesto.dpIva;
    }

    validarProveedor() {
        this.catalogoService.buscarCatalogoPorId( +this.detallePresupuesto.idProveedor ).subscribe( res => {
            this.detallePresupuesto.cpIdProveedor = res;
        },
            err => {
                console.error( err );
            } );
    }

    enviarDatosDetallePresupuesto() {
        this.setearValores();
        if ( this.imagenPdf === undefined ) {
            swal( { title: 'Error!', text: 'No ha cargardo el RIDE.!', icon: 'error' } );
        } else {
            console.log("Antes de guardar" + this.detallePresupuesto);
            console.log(this.imagenPdf);
            console.log(this.imagenXml);
            console.log(this.imagenAnexos);
            this.detallePresupuestoService.guardarDatosDetallePresupuesto( this.detallePresupuesto, this.imagenPdf, this.imagenXml, this.imagenAnexos ).subscribe(
                res => {
                    swal( { title: 'OK!', text: 'Registro exitoso', icon: 'success' } );
                    this.aplicaIce = false;
                    this.detallePresupuesto = {};
                    this.idCabecera = this.route.snapshot.queryParams['id'];
                    this.detallePresupuesto.idCabecera = this.idCabecera;
                    this.detallePresupuesto.cpIdProveedor = {};
                    this.detallePresupuesto.cpIdFabricante = {};
                    this.detallePresupuesto.cpMes = {};
                    this.model = { fechaRegistro: new Date(), dpTotalFactura: 0.0 };
                    this.imagenPdf = null;
                    this.imagenXml = null;
                    this.imagenAnexos = null;
                },
                err => {
                    swal( { title: 'Error!', text: err.error.descripcion, icon: 'error' } );
                }
            );
        }
    }

    cargarFactura( files: FileList ) {
        if ( files.item( 0 ).type === 'application/pdf' ) {
            console.log( files.item( 0 ) );
            this.imagenPdf = files.item( 0 );
        } else {
            swal( { title: 'Error!', text: 'Formato no admitido', icon: 'error' } );
        }
    }

    cargarXml( files: FileList ) {
        if ( files.item( 0 ).type === 'text/xml' ) {
            console.log( files.item( 0 ) );
            this.imagenXml = files.item( 0 );
        } else {
            this.imagenXml = null;
            swal( { title: 'Error!', text: 'Formato no admitido', icon: 'error' } );
        }
    }

    cargarAnexos( files: FileList ) {
        if ( files.item( 0 ).type === 'application/zip' || files.item( 0 ).type === 'application/x-zip-compressed'
            || files.item( 0 ).type === 'multipart/x-zip' || files.item( 0 ).type === 'application/x-compressed' ) {
            console.log( files.item( 0 ) );
            this.imagenAnexos = files.item( 0 );
        } else {
            this.imagenAnexos = null;
            swal( { title: 'Error!', text: 'Formato no admitido', icon: 'error' } );
        }
    }

    setearValores() {
        this.detallePresupuesto.dpFechaFactura = new Date( this.model.fechaRegistro );
        this.detallePresupuesto.idUsuario = obtenerIdUsuario();
    }

}
