import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CabeceraDetalle } from '../shared/model/cabecera-detalle';

@Injectable({
  providedIn: 'root'
})
export class CabeceraDetalleService {

    readonly URL_SRV_PRESUPUESTO = environment.urlSrvPresupuesto;

    constructor( private http: HttpClient ) { }
    
    buscarCabeceraFiltros( idAnio: number, idCuentaContable: number, idArea: number, idResponsable: number ): Observable<any> {
        return this.http.get<CabeceraDetalle[]>( `${this.URL_SRV_PRESUPUESTO}/cabeceraDetalle/secure/buscarCabeceraFiltros/${idAnio}/${idCuentaContable}/${idArea}/${idResponsable}`);
    }
    
}
