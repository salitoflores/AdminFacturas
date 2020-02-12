import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { CabeceraPresupuesto } from '../../shared/model/cabecera-presupuesto';
import { CabeceraPresupuestoService } from '../../services/cabecera-presupuesto.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component( {
    selector: 'bi-cabecera-presupuesto',
    templateUrl: './cabecera-presupuesto.component.html',
    styles: []
} )
export class CabeceraPresupuestoComponent implements OnInit {

    cabeceraPresupuesto: CabeceraPresupuesto;
id: number;

    lstCodigoCatalogoCentroCosto: Catalogo[] = [];
    lstCodigoCatalogoArea: Catalogo[] = [];
    lstCodigoCatalogoServicio: Catalogo[] = [];
    lstCodigoCatalogoResponsable: Catalogo[] = [];
    lstCodigoCatalogoCuentaContable: Catalogo[] = [];
    lstCodigoCatalogoTipologia: Catalogo[] = [];
    lstCodigoCatalogoTipoGasto: Catalogo[] = [];
    lstCodigoCatalogoEstado: Catalogo[] = [];
    lstCodigoCatalogoTipoEjecucion: Catalogo[] = [];
    lstCodigoCatalogoFuncion: Catalogo[] = [];
    lstCodigoCatalogoAnio: Catalogo[] = [];

    constructor( private route: ActivatedRoute, private catalogoService: CatalogoService,
            private cabeceraPresupuestoService: CabeceraPresupuestoService,
        ) {}

    ngOnInit() {
        this.id = this.route.snapshot.queryParams['id'];

        if ( this.id != null ) {
            this.cabeceraPresupuestoService.buscarCabeceraPresupuestoPorId(this.id).subscribe( res => {
                this.cabeceraPresupuesto = res;
            },
                err => {
                    console.error( err );
                } );
        }

        this.cabeceraPresupuesto = {};
        this.cabeceraPresupuesto.cpIdCuentaContable = {};
        this.cabeceraPresupuesto.cpIdArea = {};
        this.cabeceraPresupuesto.cpIdCentroCosto = {};
        this.cabeceraPresupuesto.cpIdServicio = {};
        this.cabeceraPresupuesto.cpIdUsuarioResponsable = {};
        this.cabeceraPresupuesto.cpIdTopologia = {};
        this.cabeceraPresupuesto.cpIdFuncion = {};
        this.cabeceraPresupuesto.cpIdTipoGasto = {};
        this.cabeceraPresupuesto.cpIdEstado = {};
        this.cabeceraPresupuesto.cpIdTipoEjecucion = {};
        this.cabeceraPresupuesto.cpIdAnio = {};
        this.cabeceraPresupuesto.cpProyeccionPagoEnero =  0;
        this.cabeceraPresupuesto.cpProyeccionPagoFebrero = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoMarzo = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoAbril = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoMayo = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoJunio = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoJulio = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoAgosto = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoSeptiembre = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoOctubre = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoNoviembre = 0;
        this.cabeceraPresupuesto.cpProyeccionPagoDiciembre = 0;
        this.cabeceraPresupuesto.cpBaseCero = 0;
        this.cabeceraPresupuesto.cpCrecimiento = 0;
        this.cabeceraPresupuesto.cpPresupuestoAnioActual = 0;

        // cuenta contable
        this.catalogoService.buscarCatalogos(405).subscribe( res => {
            this.lstCodigoCatalogoCuentaContable = res;
        },
            err => {
                console.error( err );
            } );
        // area
        this.catalogoService.buscarCatalogos(401).subscribe( res => {
            this.lstCodigoCatalogoArea = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(402).subscribe( res => {
            this.lstCodigoCatalogoCentroCosto = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(403).subscribe( res => {
            this.lstCodigoCatalogoServicio = res;
        },
            err => {
                console.error( err );
            } );
        // responsable
        this.catalogoService.buscarCatalogos(404).subscribe( res => {
            this.lstCodigoCatalogoResponsable = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(406).subscribe( res => {
            this.lstCodigoCatalogoTipologia = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(408).subscribe( res => {
            this.lstCodigoCatalogoTipoGasto = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(410).subscribe( res => {
            this.lstCodigoCatalogoTipoEjecucion = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(407).subscribe( res => {
            this.lstCodigoCatalogoFuncion = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(587).subscribe( res => {
            this.lstCodigoCatalogoEstado = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(593).subscribe( res => {
            this.lstCodigoCatalogoAnio = res;
        },
            err => {
                console.error( err );
            } );
    }

    sumar() {
        this.cabeceraPresupuesto.cpPresupuestoAnioActual = +this.cabeceraPresupuesto.cpBaseCero +
        +this.cabeceraPresupuesto.cpCrecimiento;
    }

    guardarDatosCabeceraPresupuesto() {
        this.cabeceraPresupuestoService.guardarDatosCabeceraPresupuesto( this.cabeceraPresupuesto ).subscribe(
            res => {
                swal('OK!', 'Registro exitoso', 'success');
                this.cabeceraPresupuesto = {};
            },
            err => {
                swal('Error!', err.error.descripcion, 'error');
            }
        );
    }

}
