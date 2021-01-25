import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../shared/model/catalogo';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../shared/model/contrato';
import swal from 'sweetalert';
import { ImFactura } from '../../shared/model/im-factura';
import { TreeModule } from 'primeng/tree';

@Component( {
    selector: 'bi-contrato',
    templateUrl: './contrato.component.html',
    styleUrls: []
} )
export class ContratoComponent implements OnInit {

    flagListadoContratosProveedor: boolean;
    flagCrearContrato: boolean;
    idProveedor: number; // sirve para identificar el proveedor desde otra pantalla
    proveedorBuscado: Catalogo;
    lstContratosProveedor: Contrato[] = [];
    lstCatalogoProveedores: Catalogo[] = [];
    lstCatalogoTipoContrato: Catalogo[] = [];
    lstCatalogoAreaTi: Catalogo[] = [];
    lstCatalogoTipoPago: Catalogo[] = [];
    lstCatalogoEstadoContrato: Catalogo[] = [];
    contratoNuevo: Contrato;
    model = { fechaInicioAux: new Date(), fechaFinAux: new Date() };
    documentoPdf: File;
    auxFile: File;

    flagDocumento: boolean;

    constructor( private route: ActivatedRoute, private contratoService: ContratoService,
        private catalogoService: CatalogoService, private router: Router ) { }

    ngOnInit() {

        //recupera Id Proveedor desde pantalla de proveedores
        this.idProveedor = this.route.snapshot.queryParams['idProveedor'];
        this.inicializarObjetos();
    }

    inicializarObjetos() {

        //
        this.contratoNuevo = {};
        this.proveedorBuscado = {};

        // cargar catalogos
        // catalogo proveedores
        this.catalogoService.buscarCatalogos( 399 ).subscribe( res => {
            this.lstCatalogoProveedores = res;
        },
            err => {
                console.error( err );
            } );

        // catalogo tipo de contrato
        this.catalogoService.buscarCatalogoPorDescripcion( 'TIPO CONTRATO' ).subscribe( res => {
            let idPadre = res;
            this.catalogoService.buscarCatalogos( idPadre.cpIdCatalogo ).subscribe( res => {
                this.lstCatalogoTipoContrato = res;
            },
                err => {
                    console.error( "Error al cargar Tipo de Contrato" );
                } );
        },
            err => {
                console.error( "Error al cargar FlagPadre de Tipo de Contrato" );
            } );

        // catalogo area ti
        this.catalogoService.buscarCatalogoPorDescripcion( 'AREA TI' ).subscribe( res => {
            let idPadre = res;
            this.catalogoService.buscarCatalogos( idPadre.cpIdCatalogo ).subscribe( res => {
                this.lstCatalogoAreaTi = res;
            },
                err => {
                    console.error( "Error al cargar Area TI" );
                } );
        },
            err => {
                console.error( "Error al cargar FlagPadre de Area TI" );
            } );

        // catalogo tipo de pago
        this.catalogoService.buscarCatalogoPorDescripcion( 'TIPO PAGO' ).subscribe( res => {
            let idPadre = res;
            this.catalogoService.buscarCatalogos( idPadre.cpIdCatalogo ).subscribe( res => {
                this.lstCatalogoTipoPago = res;
            },
                err => {
                    console.error( "Error al cargar Tipo Pago" );
                } );
        },
            err => {
                console.error( "Error al cargar FlagPadre de Tipo Pago" );
            } );

        // catalogo tipo de pago
        this.catalogoService.buscarCatalogoPorDescripcion( 'ESTADO CONTRATO' ).subscribe( res => {
            let idPadre = res;
            this.catalogoService.buscarCatalogos( idPadre.cpIdCatalogo ).subscribe( res => {
                this.lstCatalogoEstadoContrato = res;
            },
                err => {
                    console.error( "Error al cargar Estado Contrato" );
                } );
        },
            err => {
                console.error( "Error al cargar FlagPadre de Estado Contrato" );
            } );

        //carga lista de contratos si idProveedor viene con valor
        this.cargarProveedor( this.idProveedor );



    }

    cargarProveedor( idProveedor: number ) {
        if ( this.idProveedor != null ) {
            this.contratoNuevo.idProveedor = this.idProveedor;
            this.catalogoService.buscarCatalogoPorId( this.idProveedor ).subscribe( res => {
                this.proveedorBuscado = res;
            }, err => {
                console.error( err );
            } );
            this.contratoService.cargarContratosProveedor( this.idProveedor ).subscribe( res => {
                this.lstContratosProveedor = res;
                //validar si existen contratos caso contrario mostrar la seccion para crear contrato
                if ( this.lstContratosProveedor.length > 0 ) {
                    this.flagListadoContratosProveedor = true;
                    this.flagCrearContrato = false;
                } else {
                    this.flagListadoContratosProveedor = false;
                    this.flagCrearContrato = true;
                }
            },
                err => {
                    console.error( err );
                } );

        }
    }

    cargarDocumento( files: FileList ) {
        if ( files.item( 0 ).type === 'application/pdf' ) {

            this.documentoPdf = files.item( 0 );
            console.log( "Se carga documento nuevo: " + files.item( 0 ) );
        } else {
            swal( { title: 'Error!', text: 'Formato no admitido', icon: 'error' } );
        }
    }

    cambiarDocumento( id: number ) {
        this.flagDocumento = false;
        this.documentoPdf = null;
    }

    verDocumento( id: number ) {
        this.contratoService.buscarDocumento( id ).subscribe(
            data => {
                this.contratoNuevo.coDocumento = data;
                const blob = new Blob( [this.contratoNuevo.coDocumento], { type: 'application/pdf' } );
                const url = window.URL.createObjectURL( blob );
                window.open( url, 'Contrato' );
            }, error => {
                console.log( error );
                console.log( 'Error downloading the file.' );
            }
        );
    }

    guardarContrato() {
        if ( this.documentoPdf === undefined ) {
            swal( { title: 'Error!', text: 'No ha cargardo el RIDE.!', icon: 'error' } );
        } else {
            this.contratoNuevo.coFechaInicio = new Date( this.model.fechaInicioAux );
            this.contratoNuevo.coFechaFin = new Date( this.model.fechaFinAux );
            if ( this.documentoPdf === undefined ) {
                swal( { title: 'Error!', text: 'No ha cargardo el Contrato.!', icon: 'error' } );
            } else {
                this.contratoService.guardarContrato( this.contratoNuevo, this.documentoPdf ).subscribe(
                    res => {
                        swal( { title: 'OK!', text: 'Registro exitoso', icon: 'success' } );
                        this.inicializarObjetos();
                    },
                    err => {
                        swal( { title: 'Error!', text: err.error.descripcion, icon: 'error' } );
                    }
                );
            }
        }
    }

    editarContrato( contratoEditar: Contrato ) {
        this.contratoNuevo = {};
        this.contratoNuevo = contratoEditar;
        this.flagCrearContrato = true;
        this.flagListadoContratosProveedor = false;
        this.contratoNuevo.coDocumento = null;
        //cargar documento si existiera
        this.contratoService.buscarDocumento( this.contratoNuevo.coIdContrato ).subscribe(
            data => {
                this.auxFile = data;
                const aux = new Blob( [this.auxFile], { type: 'application/pdf' } );
                if ( aux.size > 0 ) {
                    this.documentoPdf = this.auxFile;
                    this.flagDocumento = true;
                } else {
                    this.documentoPdf = null;
                }
            }, err => {
                console.error( err );
            } );
    }

    nuevoContrato( idProveedorBuscado: number ) {
        this.flagCrearContrato = true;
        this.flagListadoContratosProveedor = false;
        this.contratoNuevo = {};
        this.contratoNuevo.idProveedor = this.idProveedor;
        this.catalogoService.buscarCatalogoPorId( this.idProveedor ).subscribe( res => {
            this.proveedorBuscado = res;
        }, err => {
            console.error( err );
        } );
    }

    cancelar() {
        this.router.navigate( ['home/registro-proveedor'] );
    }

}
