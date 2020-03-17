import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { CabeceraPresupuesto } from '../../shared/model/cabecera-presupuesto';
import { CabeceraPresupuestoService } from '../../services/cabecera-presupuesto.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { UsuarioService } from '../../services/usuario.service';

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
            private usuarioService: UsuarioService
        ) {}

    ngOnInit() {
        this.id = this.route.snapshot.queryParams['id'];

        this.buscarCabeceraId(this.id);
        this.inicializarObjetos();
        this.cargarCatalogos();
    }

    sumar() {
        this.cabeceraPresupuesto.cpPresupuestoAnioActual = +this.cabeceraPresupuesto.cpBaseCero +
        +this.cabeceraPresupuesto.cpCrecimiento;
    }

    guardarDatosCabeceraPresupuesto() {
        this.cabeceraPresupuestoService.guardarDatosCabeceraPresupuesto( this.cabeceraPresupuesto ).subscribe(
            res => {
                swal('OK!', 'Registro exitoso', 'success');
                this.inicializarObjetos();
            },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    swal('Error!', err.error.descripcion, 'error');
                }
            }
        );
    }

    buscarCabeceraId(id: number) {
        if ( id ) {
            this.cabeceraPresupuestoService.buscarCabeceraPresupuestoPorId(id).subscribe( res => {
                this.cabeceraPresupuesto = res;
            },
                err => {
                    if ( err.status == 401 ) {
                        swal(':(', 'Sesión Caducada', 'info');
                        this.usuarioService.logout();
                    } else {
                        console.error( err );
                    }
                } );
        }
    }

    inicializarObjetos() {
        this.cabeceraPresupuesto = {
                cpIdCuentaContable : {},
                cpIdArea : {},
                cpIdCentroCosto : {},
                cpIdServicio : {},
                cpIdUsuarioResponsable : {},
                cpIdTopologia : {},
                cpIdFuncion : {},
                cpIdTipoGasto : {},
                cpIdEstado : {},
                cpIdTipoEjecucion : {},
                cpIdAnio : {},
                cpProyeccionPagoEnero : 0,
                cpProyeccionPagoFebrero : 0,
                cpProyeccionPagoMarzo : 0,
                cpProyeccionPagoAbril : 0,
                cpProyeccionPagoMayo : 0,
                cpProyeccionPagoJunio : 0,
                cpProyeccionPagoJulio : 0,
                cpProyeccionPagoAgosto : 0,
                cpProyeccionPagoSeptiembre : 0,
                cpProyeccionPagoOctubre : 0,
                cpProyeccionPagoNoviembre : 0,
                cpProyeccionPagoDiciembre : 0,
                cpBaseCero : 0,
                cpCrecimiento : 0,
                cpPresupuestoAnioActual : 0,
        };
    }

    cargarCatalogos() {
     // cuenta contable
        this.catalogoService.buscarCatalogos(405).subscribe( res => {
            this.lstCodigoCatalogoCuentaContable = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        // area
        this.catalogoService.buscarCatalogos(401).subscribe( res => {
            this.lstCodigoCatalogoArea = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.catalogoService.buscarCatalogos(402).subscribe( res => {
            this.lstCodigoCatalogoCentroCosto = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.catalogoService.buscarCatalogos(403).subscribe( res => {
            this.lstCodigoCatalogoServicio = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        // responsable
        this.catalogoService.buscarCatalogos(404).subscribe( res => {
            this.lstCodigoCatalogoResponsable = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.catalogoService.buscarCatalogos(406).subscribe( res => {
            this.lstCodigoCatalogoTipologia = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.catalogoService.buscarCatalogos(408).subscribe( res => {
            this.lstCodigoCatalogoTipoGasto = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.catalogoService.buscarCatalogos(410).subscribe( res => {
            this.lstCodigoCatalogoTipoEjecucion = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.catalogoService.buscarCatalogos(407).subscribe( res => {
            this.lstCodigoCatalogoFuncion = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.catalogoService.buscarCatalogos(587).subscribe( res => {
            this.lstCodigoCatalogoEstado = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.catalogoService.buscarCatalogos(593).subscribe( res => {
            this.lstCodigoCatalogoAnio = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
    }
}
