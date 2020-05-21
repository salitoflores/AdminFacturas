import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CabeceraPresupuesto } from '../../shared/model/cabecera-presupuesto';
import { CabeceraPresupuestoService } from '../../services/cabecera-presupuesto.service';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { DataPresupuestoService } from '../../services/data-presupuesto.service';
import { obtenerIdArea } from '../../shared/util/seguridad-acceso';

@Component( {
    selector: 'bi-cabecera-presupuesto-lista',
    templateUrl: './cabecera-presupuesto-lista.component.html',
    styles: []
} )
export class CabeceraPresupuestoListaComponent implements OnInit {

    lstCabeceraPresupuesto: CabeceraPresupuesto[] = [];

    lstCodigoCatalogoCuentaContable: Catalogo[] = [];
    lstCodigoCatalogoTipoGasto: Catalogo[] = [];
    lstCodigoCatalogoArea: Catalogo[] = [];
    lstCodigoCatalogoResponsable: Catalogo[] = [];
    tipoGasto: Catalogo;
    cuentaContable: Catalogo;
    responsable: Catalogo;
    area: Catalogo;
    display: boolean;

    constructor( private router: Router, private cabeceraPresupuestoService: CabeceraPresupuestoService,
            private catalogoService: CatalogoService, private dataPresupuestoService: DataPresupuestoService ) { }

    ngOnInit() {
        if (this.dataPresupuestoService.dato) {
            this.lstCabeceraPresupuesto = this.dataPresupuestoService.dato;
            this.dataPresupuestoService.dato = null;
        }

        this.cuentaContable = {};
        this.responsable = {};
        this.area = {};
        this.tipoGasto = {};
        this.display = true;

        // tipo de gasto opex - capex
        this.catalogoService.buscarCatalogos(408).subscribe( res => {
            this.lstCodigoCatalogoTipoGasto = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(405).subscribe( res => {
            // this.lstCodigoCatalogoCuentaContable = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(401).subscribe( res => {
            this.lstCodigoCatalogoArea = res;
        },
            err => {
                console.error( err );
            } );
        this.catalogoService.buscarCatalogos(404).subscribe( res => {
            this.lstCodigoCatalogoResponsable = res;
        },
            err => {
                console.error( err );
            } );

    }

    buscarCabeceraPresupuesto() {
        const idArea = obtenerIdArea();
        if ( idArea == 1850 ) {
            this.area.cpIdCatalogo = idArea;
            console.log(this.area.cpIdCatalogo);
        } else {
            if (this.area.cpIdCatalogo == null) {
                this.area.cpIdCatalogo = 0;
            }
        }
        if (this.responsable.cpIdCatalogo == null) {
            this.responsable.cpIdCatalogo = 0;
        }
        this.cabeceraPresupuestoService.buscarCabeceraFiltros(this.cuentaContable.cpIdCatalogo,
                this.area.cpIdCatalogo, this.responsable.cpIdCatalogo).subscribe( res => {
            this.lstCabeceraPresupuesto = res;
            this.almacenarData();
        },
            err => {
                console.error( err );
            } );
    }

    cargarCuentas() {
        this.catalogoService.buscarCuentasTipoGasto(this.tipoGasto.cpIdCatalogo).subscribe( res => {
            this.lstCodigoCatalogoCuentaContable = res;
        },
            err => {
                console.error( err );
            } );
    }

    almacenarData() {
        this.dataPresupuestoService.dato = this.lstCabeceraPresupuesto;
    }

    registrarFactura( id: number ) {
        this.router.navigate( ['home/detalle-presupuesto'], { queryParams: { id: id } } );
    }

    modificarCabecera( id: number ) {
        this.router.navigate( ['home/cabecera-presupuesto'], { queryParams: { id: id } } );
    }

    consultarDetalles( id: number ) {
        this.router.navigate( ['home/detalle-presupuesto-lista'], { queryParams: { id: id } } );
    }

}
