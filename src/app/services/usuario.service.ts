import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../shared/model/usuario';
import { Observable } from 'rxjs';

@Injectable( {
    providedIn: 'root'
} )
export class UsuarioService {

    readonly URL_SRV_USUARIO = environment.urlSrvUsuario;

    constructor( private http: HttpClient ) { }

    verificarUsuario( usuario: Usuario ): Observable<any> {
        return this.http.post<Usuario>(`${this.URL_SRV_USUARIO}/verificarUsuario`, usuario );
    }

}
