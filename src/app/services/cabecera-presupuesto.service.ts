import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CabeceraPresupuesto } from '../shared/model/cabecera-presupuesto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CabeceraPresupuestoService {

    readonly URL_SRV_CABECERA_PRESUPUESTO = environment.urlSrvCabeceraPresupuesto;

    constructor( private http: HttpClient ) { }
    guardarDatosCabeceraPresupuesto( cabeceraPresupuesto: CabeceraPresupuesto ): Observable<any> {
        return this.http.post( `${this.URL_SRV_CABECERA_PRESUPUESTO}/secure/crearCabeceraPresupuesto`, cabeceraPresupuesto );
    }

    listarCabeceraPresupuesto(): Observable<CabeceraPresupuesto[]> {
        return this.http.get<CabeceraPresupuesto[]>( `${this.URL_SRV_CABECERA_PRESUPUESTO}/secure/listarCabeceraPresupuesto` );
    }

    buscarCabeceraPresupuestoPorId( id: number ): Observable<any> {
        return this.http.get<CabeceraPresupuesto>( `${this.URL_SRV_CABECERA_PRESUPUESTO}/secure/buscarCabeceraPresupuestoPorId/${id}` );
    }

    buscarCabeceraFiltros( idCuentaContable: number, idArea: number, idResponsable: number ): Observable<any> {
        return this.http.get<CabeceraPresupuesto[]>( `${this.URL_SRV_CABECERA_PRESUPUESTO}/secure/buscarCabeceraFiltros/${idCuentaContable}/${idArea}/${idResponsable}`);
    }

    consultaConsumoPresupuesto( idTipoGasto: number): Observable<any> {
        return this.http.get<CabeceraPresupuesto[]>( `${this.URL_SRV_CABECERA_PRESUPUESTO}/secure/consultaConsumoPresupuesto/${idTipoGasto}`);
    }

}
