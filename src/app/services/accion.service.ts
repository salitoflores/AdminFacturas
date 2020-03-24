import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accion } from '../shared/model/accion';
import { RolAccion } from '../shared/model/rol-accion';

@Injectable({
  providedIn: 'root'
})
export class AccionService {

    readonly URL_SRV_ACCION = environment.urlSrvAccion;

    constructor( private http: HttpClient ) { }

    cargarAccionesRegistradas(): Observable<Accion[]> {
        return this.http.get<Accion[]>( `${this.URL_SRV_ACCION}/secure/cargarAccionesRegistradas` );
    }

    cargarAccionesActivas (): Observable<any> {
        return this.http.get<Accion>( `${this.URL_SRV_ACCION}/secure/cargarAccionesActivas` );
    }

    guardarAccion ( accion: Accion ): Observable<any> {
        return this.http.post( `${this.URL_SRV_ACCION}/secure/crearAccion`, accion );
    }

    cargarAccionesAsignadas ( idRol: number ): Observable<any> {
        return this.http.get<Accion>( `${this.URL_SRV_ACCION}/secure/cargarAccionesAsignadas/${idRol}` );
    }

    cargarAccionesDisponibles ( idRol: number ): Observable<any> {
        return this.http.get<Accion>( `${this.URL_SRV_ACCION}/secure/cargarAccionesDisponibles/${idRol}` );
    }

    eliminarRolAcciones ( idRol: number ): Observable<any> {
        return this.http.get<Accion>( `${this.URL_SRV_ACCION}/secure/eliminarRolAcciones/${idRol}` );
    }

    crearRolAcciones( rolAccion: RolAccion ): Observable<any> {
        return this.http.post( `${this.URL_SRV_ACCION}/secure/crearRolAccion`, rolAccion );
    }

}
