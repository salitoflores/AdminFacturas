import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component( {
    selector: 'bi-catalogo',
    templateUrl: './catalogo.component.html',
    styles: []
} )
export class CatalogoComponent implements OnInit {

    catalogo: Catalogo;
    id: number;
    flagPadre: number;
    flagFactura: boolean;
    flagFacturaExterior: boolean;
    flagTipoGasto: boolean;
    lstCatalogoPadre: Catalogo[] = [];
lstCatalogoTipoGasto: Catalogo[] = [];
    lstCatalogoHijo: Catalogo[] = [];

    constructor( private catalogoService: CatalogoService, private route: ActivatedRoute ) { }

    ngOnInit() {

        this.catalogo = {};
        this.catalogo.cpestado = true;
        this.flagTipoGasto = false; // flag para mostrar el combo de tipo de gasto opex/capex
        // listar catalogos padres, cpCampo11 = 0
        this.flagPadre = 0;
        this.flagFactura = false;
        this.flagFacturaExterior = false;

        this.catalogoService.buscarCatalogos( 408 ).subscribe( res => {
            this.lstCatalogoTipoGasto = res;
        },
            err => {
                console.error( err );
            } );

        this.catalogoService.buscarCatalogos( this.flagPadre ).subscribe( res => {
            this.lstCatalogoPadre = res;
        },
            err => {
                console.error( err );
            } );

        this.id = this.route.snapshot.queryParams['idCatalogo'];
        if ( this.id != null ) {
            this.catalogoService.buscarCatalogoPorId( this.id ).subscribe( res => {
                this.catalogo = res;
                if (this.catalogo.cpCampo10 != null) {
                    this.flagTipoGasto = true;
                }
            },
                err => {
                    console.error( err );
                } );
        }
    }

    validarTipoCatalogo() {
        if (this.catalogo.cpCampo11 == 405) {
            this.flagTipoGasto = true;
        } else {
            this.flagTipoGasto = false;
            this.catalogo.cpCampo10 = null;
        }
    }

    generaFactura() {
        this.flagFactura = true;
    }

    enviarDatosCatalogo() {
        if ( this.flagFactura ) {
            this.catalogo.cpCampo1 = 'SI'; // genera factura
        }
        if ( this.flagFacturaExterior ) {
            this.catalogo.cpCampo2 = 'SI'; // factura del exterior
        }
        this.catalogoService.guardarDatosCatalogo( this.catalogo ).subscribe(
            res => {
                swal('OK!', 'Registro exitoso', 'success');
                this.catalogo = {};
                this.catalogo.cpestado = true;
            },
            err => {
                swal('Error!', err.error.descripcion, 'error');
            }
        );
    }

}
