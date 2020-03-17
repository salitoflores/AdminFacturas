import { Component, OnInit } from '@angular/core';
import { Rol } from '../../shared/model/rol';
import { RolService } from '../../services/rol.service';
import { UsuarioService } from '../../services/usuario.service';
import { Accion } from '../../shared/model/accion';
import { AccionService } from '../../services/accion.service';
import { RolAccion } from '../../shared/model/rol-accion';

@Component( {
    selector: 'bi-rol',
    templateUrl: './rol.component.html',
    styles: []
} )
export class RolComponent implements OnInit {

    rol: Rol;
    lstRolesRegistrados: Rol[] = [];
    rolAccion: RolAccion;

    accionesDisponibles: Accion[] = [];
    accionesAsignadas: Accion[] = [];

    constructor( private rolService: RolService,
        private usuarioService: UsuarioService,
        private accionService: AccionService ) { }

    ngOnInit() {
        this.inicializarObjetos();
        this.cargarRoles();

    }

    inicializarObjetos() {
        this.rol = {};
        this.rol.roEstadoRol = true;
        this.rolAccion = {};
    }



    cargarRoles() {
        this.rolService.cargarRolesRegistrados().subscribe( res => {
            this.lstRolesRegistrados = res;
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

    guardarDatosRol() {
        this.rolService.guardarRol( this.rol ).subscribe(
            res => {
                swal( 'OK!', 'Registro exitoso', 'success' );
                this.inicializarObjetos();
                this.cargarRoles();
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

    modificarRol( rol2: Rol ) {
        this.rol = rol2;
    }

    acciones( rolAcciones: Rol ) {
        // console.log(rolAcciones);
        this.rolAccion.idRol = rolAcciones.roIdRol;
        this.accionService.cargarAccionesAsignadas( this.rolAccion.idRol ).subscribe( res => {
            this.accionesAsignadas = res;
            // console.log (this.accionesAsignadas);
        },
            err => {
                if ( err.status === 401 ) {
                    swal( ':(', 'Sesión Caducada', 'info' );
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
        this.accionService.cargarAccionesDisponibles( rolAcciones.roIdRol ).subscribe( res => {
            this.accionesDisponibles = res;
            // console.log (this.accionesAsignadas);
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

    guardarAcciones() {
        this.rolAccion.lstAcciones = this.accionesAsignadas;
        this.accionService.crearRolAcciones(this.rolAccion).subscribe(
                res => {
                    swal('OK!', 'Registro exitoso', 'success');
                    this.inicializarObjetos();
                },
                err => {
                    swal('Error!', err.error.descripcion, 'error');
                }
            );
    }

}
