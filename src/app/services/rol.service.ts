import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../shared/model/rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {

    readonly URL_SRV_PRESUPUESTO = environment.urlSrvPresupuesto;

    constructor( private http: HttpClient ) { }

    cargarRolesRegistrados(): Observable<Rol[]> {
        return this.http.get<Rol[]>( `${this.URL_SRV_PRESUPUESTO}/rol/secure/cargarRolesRegistrados` );
    }

    cargarRolesActivos (): Observable<any> {
        return this.http.get<Rol>( `${this.URL_SRV_PRESUPUESTO}/rol/secure/cargarRolesActivos` );
    }

    guardarRol( rol: Rol ): Observable<any> {
        return this.http.post( `${this.URL_SRV_PRESUPUESTO}/rol/secure/crearRol`, rol );
    }

}
