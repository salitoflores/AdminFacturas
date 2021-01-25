import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CabeceraPresupuesto } from '../shared/model/cabecera-presupuesto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CabeceraPresupuestoService {

    readonly URL_SRV_CABECERA_PRESUPUESTO = environment.urlSrvPresupuesto;

    constructor( private http: HttpClient ) { }
    guardarDatosCabeceraPresupuesto( cabeceraPresupuesto: CabeceraPresupuesto ): Observable<any> {
        return this.http.post( `${this.URL_SRV_CABECERA_PRESUPUESTO}/cabeceraPresupuesto/secure/crearCabeceraPresupuesto`, cabeceraPresupuesto );
    }

    listarCabeceraPresupuesto(): Observable<CabeceraPresupuesto[]> {
        return this.http.get<CabeceraPresupuesto[]>( `${this.URL_SRV_CABECERA_PRESUPUESTO}/cabeceraPresupuesto/secure/listarCabeceraPresupuesto` );
    }

    buscarCabeceraPresupuestoPorId( id: number ): Observable<any> {
        return this.http.get<CabeceraPresupuesto>( `${this.URL_SRV_CABECERA_PRESUPUESTO}/cabeceraPresupuesto/secure/buscarCabeceraPresupuestoPorId/${id}` );
    }

    buscarCabeceraFiltros( idAnio: number, idCuentaContable: number, idArea: number, idResponsable: number ): Observable<any> {
        return this.http.get<CabeceraPresupuesto[]>( `${this.URL_SRV_CABECERA_PRESUPUESTO}/cabeceraPresupuesto/secure/buscarCabeceraFiltros/${idAnio}/${idCuentaContable}/${idArea}/${idResponsable}`);
    }

    consultaConsumoPresupuesto( idTipoGasto: number): Observable<any> {
        return this.http.get<CabeceraPresupuesto[]>( `${this.URL_SRV_CABECERA_PRESUPUESTO}/cabeceraPresupuesto/secure/consultaConsumoPresupuesto/${idTipoGasto}`);
    }

}
