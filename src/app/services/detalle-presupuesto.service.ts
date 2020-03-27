import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DetallePresupuesto } from '../shared/model/detalle-presupuesto';
import { Observable } from 'rxjs';
import { ImFactura } from '../shared/model/im-factura';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable( {
    providedIn: 'root'
} )
export class DetallePresupuestoService {

    readonly URL_SRV_DETALLE_PRESUPUESTO = environment.urlSrvDetallePresupuesto;

    constructor( private http: HttpClient) { }
    guardarDatosDetallePresupuesto( detallePresupuesto: DetallePresupuesto, fileImg: File, fileXml: File, fileAnexo: File ): Observable<any> {
//        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/crearDetallePresupuesto`, detallePresupuesto );
        const formData: FormData = new FormData();
        formData.append('detallePresupuesto', JSON.stringify(detallePresupuesto));
        console.log(fileImg);
        formData.append('fileImg', fileImg);
        if (fileXml == undefined) {
            formData.append('fileXml', null);
        } else {
            formData.append('fileXml', fileXml);
        }
        if (fileAnexo == undefined) {
            formData.append('fileAnexo', null);
        } else {
            formData.append('fileAnexo', fileAnexo);
        }
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/crearDetallePresupuesto`, formData );
    }

    buscarDetalleFiltroCabeceraMes( idCabecera: number, idMes: number ): Observable<DetallePresupuesto[]> {
        return this.http.get<DetallePresupuesto[]>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/buscarDetalleCabeceraMes/${idCabecera}/${idMes}` );
    }

    cargarFacturasFiltroMesUsuarioRegistro( idMes: number, idUsuario: number ): Observable<DetallePresupuesto[]> {
        return this.http.get<DetallePresupuesto[]>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/cargarFacturasFiltroMesUsuarioRegistro/${idMes}/${idUsuario}` );
    }

    buscarDetallePresupuestoPorId( idDetalle: number ): Observable<any> {
        return this.http.get<DetallePresupuesto>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/buscarDetallePresupuestoPorId/${idDetalle}` );
    }

    recuperarFacturasEstado0( idArea: number ): Observable<any> {
        return this.http.get<DetallePresupuesto>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/recuperarFacturasEstado0/${idArea}` );
    }

    recuperarFacturasEstado1( idArea: number ): Observable<any> {
        return this.http.get<DetallePresupuesto>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/recuperarFacturasEstado1/${idArea}` );
    }

    buscarFactura( id: number ): Observable<any> {
        return this.http.get( `${this.URL_SRV_DETALLE_PRESUPUESTO}/buscarFactura/${id}`, { responseType: 'blob' } );
    }

    buscarXml( id: number ): Observable<any> {
        return this.http.get( `${this.URL_SRV_DETALLE_PRESUPUESTO}/buscarXml/${id}`, { responseType: 'blob' } );
    }

    buscarAnexos( id: number ): Observable<any> {
        return this.http.get( `${this.URL_SRV_DETALLE_PRESUPUESTO}/buscarAnexos/${id}`, { responseType: 'blob' } );
    }

    aprobarFacturasAprobador1( lstFacturasAprobar: DetallePresupuesto[] ): Observable<any> {
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/aprobarFacturasAprobador1`, lstFacturasAprobar );
    }

    aprobarFacturasAprobador2( lstFacturasAprobar: DetallePresupuesto[] ): Observable<any> {
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/secure/aprobarFacturasAprobador2`, lstFacturasAprobar );
    }

}

