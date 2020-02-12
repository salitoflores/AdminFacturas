import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DetallePresupuesto } from '../shared/model/detalle-presupuesto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable( {
    providedIn: 'root'
} )
export class DetallePresupuestoService {

    readonly URL_SRV_DETALLE_PRESUPUESTO = environment.urlSrvDetallePresupuesto;

    constructor( private http: HttpClient ) { }
    guardarDatosDetallePresupuesto( detallePresupuesto: DetallePresupuesto ): Observable<any> {
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/crearDetallePresupuesto`, detallePresupuesto );
    }

    buscarDetalleFiltroCabeceraMes( idCabecera: number, idMes: number ): Observable<DetallePresupuesto[]> {
        return this.http.get<DetallePresupuesto[]>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/buscarDetalleCabeceraMes/${idCabecera}/${idMes}` );
    }

    buscarDetallePresupuestoPorId( idDetalle: number ): Observable<any> {
        return this.http.get<DetallePresupuesto>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/buscarDetallePresupuestoPorId/${idDetalle}` );
    }

}

