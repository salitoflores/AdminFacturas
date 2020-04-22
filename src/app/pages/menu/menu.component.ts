import { Component, OnInit } from '@angular/core';
import { Menu } from '../../shared/model/menu';
import { MenuService } from '../../services/menu.service';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert';

@Component( {
    selector: 'bi-menu',
    templateUrl: './menu.component.html',
    styles: []
} )
export class MenuComponent implements OnInit {

    menu: Menu;
    lstMenusRegistrados: Menu[] = [];

    constructor( private menuService: MenuService, private usuarioService: UsuarioService ) { }

    ngOnInit() {
        this.inicializarObjetos();
        this.cargarMenus();
    }

    inicializarObjetos() {
        this.menu = {};
        this.menu.meEstadoMenu = true;
    }

    cargarMenus() {
        this.menuService.cargarMenusRegistrados().subscribe( res => {
            this.lstMenusRegistrados = res;
        },
            err => {
                if ( err.status === 401 ) {
                    swal( ':(', 'Sesión Caducada', 'info' );
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
    }

    guardarDatosMenu() {
        this.menuService.guardarMenu( this.menu ).subscribe(
            res => {
                swal( 'OK!', 'Registro exitoso', 'success' );
                this.inicializarObjetos();
                this.cargarMenus();
            },
            err => {
                if ( err.status === 401 ) {
                    swal( ':(', 'Sesión Caducada', 'info' );
                    this.usuarioService.logout();
                } else {
                    swal( 'Error!', err.error.descripcion, 'error' );
                }
            }
        );
    }

    modificarMenu( menu2: Menu ) {
        this.menu = menu2;
    }

}
