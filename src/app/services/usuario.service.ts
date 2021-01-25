import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../shared/model/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable( {
    providedIn: 'root'
} )
export class UsuarioService {

    readonly URL_SRV_PRESUPUESTO = environment.urlSrvPresupuesto;

    constructor( private http: HttpClient, private router: Router ) { }

    verificarUsuario( usuario: Usuario ): Observable<any> {
        return this.http.post<Usuario>(`${this.URL_SRV_PRESUPUESTO}/usuario/verificarUsuario`, usuario );
    }

    cargarUsuariosRegistrados(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>( `${this.URL_SRV_PRESUPUESTO}/usuario/secure/cargarUsuariosRegistrados` );
    }

    guardarUsuario( usuario: Usuario ): Observable<any> {
        return this.http.post( `${this.URL_SRV_PRESUPUESTO}/usuario/secure/crearUsuario`, usuario );
    }

    logout() {
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }

}
