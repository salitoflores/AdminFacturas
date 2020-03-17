import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../shared/model/rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {

    readonly URL_SRV_ROL = environment.urlSrvRol;

    constructor( private http: HttpClient ) { }

    cargarRolesRegistrados(): Observable<Rol[]> {
        return this.http.get<Rol[]>( `${this.URL_SRV_ROL}/secure/cargarRolesRegistrados` );
    }

    cargarRolesActivos (): Observable<any> {
        return this.http.get<Rol>( `${this.URL_SRV_ROL}/secure/cargarRolesActivos` );
    }

    guardarRol( rol: Rol ): Observable<any> {
        return this.http.post( `${this.URL_SRV_ROL}/secure/crearRol`, rol );
    }

}
