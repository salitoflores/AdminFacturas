import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../shared/model/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'bi-catalogo-lista',
    templateUrl: './catalogo-lista.component.html',
    styles: []
} )
export class CatalogoListaComponent implements OnInit {

    lstCatalogoPadre: Catalogo[] = [];
lstCatalogosHijos: Catalogo[] = [];
flagPadre: number;
catalogo: Catalogo;

constructor( private catalogoService: CatalogoService, private router: Router ) { }

    ngOnInit() {

        this.catalogo = {};
        this.flagPadre = 0;
        this.catalogoService.buscarCatalogos( this.flagPadre ).subscribe( res => {
            this.lstCatalogoPadre = res;
        },
            err => {
                console.error( err );
            } );
    }

    buscarCatalogosHijos() {
        this.catalogoService.buscarCatalogos( this.flagPadre ).subscribe( res => {
            this.lstCatalogosHijos = res;
        },
            err => {
                console.error( err );
            } );
    }

    modificarCatalogo( id: number ) {
        this.router.navigate( ['home/catalogo'], { queryParams: { idCatalogo: id } } );
    }

 }
