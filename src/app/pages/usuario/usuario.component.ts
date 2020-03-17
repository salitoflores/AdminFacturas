import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { Rol } from '../../shared/model/rol';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { validarAccion } from '../../shared/util/seguridad-acceso';

@Component( {
    selector: 'bi-usuario',
    templateUrl: './usuario.component.html',
    styles: []
} )
export class UsuarioComponent implements OnInit {

    usuario: Usuario;
    lstUsuariosRegistrados: Usuario[] = [];
    lstRolesActivos: Rol[] = [];

    constructor( private usuarioService: UsuarioService,
            private rolService: RolService ) { }

    ngOnInit() {
        this.inicializarObjetos();
        this.cargarUsuarios();
        this.cargarRoles();
    }

    inicializarObjetos() {
        this.usuario = { };
        this.usuario.usEstadoUsuario = true;

    }

    cargarRoles() {
        this.rolService.cargarRolesActivos().subscribe( res => {
            this.lstRolesActivos = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal( ':(', 'Sesión Caducada', 'info' );
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
    }

    cargarUsuarios() {
        this.usuarioService.cargarUsuariosRegistrados().subscribe( res => {
            this.lstUsuariosRegistrados = res;
        },
            err => {
                if ( err.status == 401 ) {
                    swal( ':(', 'Sesión Caducada', 'info' );
                    this.usuarioService.logout();
                } else {
                    console.error( err );
                }
            } );
    }

    guardarDatosUsuario() {
        // console.log(this.usuario);
        if ( validarAccion('REGUSU') ) {
            this.usuarioService.guardarUsuario( this.usuario ).subscribe(
                    res => {
                        swal( 'OK!', 'Registro exitoso', 'success' );
                        this.inicializarObjetos();
                        this.cargarUsuarios();
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
        } else {
            swal( 'Error!', ' Usuario no autorizado ', 'error' );
        }

    }

    modificarUsuario( usuario2: Usuario ) {
        this.usuario = usuario2;
    }

}
