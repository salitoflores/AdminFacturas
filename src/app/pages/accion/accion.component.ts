import { Component, OnInit } from '@angular/core';
import { Accion } from '../../shared/model/accion';
import { AccionService } from '../../services/accion.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'bi-accion',
    templateUrl: './accion.component.html',
    styles: []
} )
export class AccionComponent implements OnInit {

    accion: Accion;
    lstAccionesRegistradas: Accion[] = [];

    constructor( private accionService: AccionService,
        private usuarioService: UsuarioService,
        private router: Router ) { }

    ngOnInit() {
        this.inicializarObjetos();
        this.cargarAcciones();
    }

    inicializarObjetos() {
        this.accion = { };
        this.accion.acEstadoAccion = true;
    }

    cargarAcciones() {
        this.accionService.cargarAccionesRegistradas().subscribe( res => {
            this.lstAccionesRegistradas = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal( ':(', 'Sesión Caducada', 'info' );
                    this.usuarioService.logout();
                } else {
                    if (err.error.mensaje === "El token ha expirado, ingrese nuevamente") {
                        localStorage.removeItem('userToken');
                        this.router.navigate(['/login']);
                      }
                }
            } );
    }

    guardarDatosAccion() {
        this.accionService.guardarAccion( this.accion ).subscribe(
            res => {
                swal( 'OK!', 'Registro exitoso', 'success' );
                this.inicializarObjetos();
                this.cargarAcciones();
            },
            err => {
                if ( err.status == 401 ) {
                    swal( ':(', 'Sesión Caducada', 'info' );
                    this.usuarioService.logout();
                } else {
                    swal( 'Error!', err.error.descripcion, 'error' );
                }
            }
        );
    }

    modificarAccion( accion2: Accion ) {
        this.accion = accion2;
    }

}
