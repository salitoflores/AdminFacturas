import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DetallePresupuesto } from '../shared/model/detalle-presupuesto';
import { Observable } from 'rxjs';
import { ImFactura } from '../shared/model/im-factura';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Catalogo } from '../shared/model/catalogo';

@Injectable( {
    providedIn: 'root'
} )
export class DetallePresupuestoService {

    readonly URL_SRV_DETALLE_PRESUPUESTO = environment.urlSrvPresupuesto;

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
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/crearDetallePresupuesto`, formData );
    }

    buscarDetalleFiltroCabeceraMes( idCabecera: number, idMes: number, idAnio: number ): Observable<DetallePresupuesto[]> {
        return this.http.get<DetallePresupuesto[]>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/buscarDetalleCabeceraMes/${idCabecera}/${idMes}/${idAnio}` );
    }

    cargarFacturasFiltroMesUsuarioRegistro( idMes: number, idUsuario: number ): Observable<DetallePresupuesto[]> {
        return this.http.get<DetallePresupuesto[]>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/cargarFacturasFiltroMesUsuarioRegistro/${idMes}/${idUsuario}` );
    }

    buscarDetallePresupuestoPorId( idDetalle: number ): Observable<any> {
        return this.http.get<DetallePresupuesto>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/buscarDetallePresupuestoPorId/${idDetalle}` );
    }

    recuperarFacturasEstado0( idArea: number ): Observable<any> {
        return this.http.get<DetallePresupuesto>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/recuperarFacturasEstado0/${idArea}` );
    }

    recuperarFacturasEstado1( idArea: number ): Observable<any> {
        return this.http.get<DetallePresupuesto>( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/recuperarFacturasEstado1/${idArea}` );
    }

    buscarFactura( id: number ): Observable<any> {
        return this.http.get( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/buscarFactura/${id}`, { responseType: 'blob' } );
    }

    buscarXml( id: number ): Observable<any> {
        return this.http.get( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/buscarXml/${id}`, { responseType: 'blob' } );
    }

    buscarAnexos( id: number ): Observable<any> {
        return this.http.get( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/buscarAnexos/${id}`, { responseType: 'blob' } );
    }

    aprobarFacturasAprobador1( lstFacturasAprobar: DetallePresupuesto[] ): Observable<any> {
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/aprobarFacturasAprobador1`, lstFacturasAprobar );
    }

    aprobarFacturasAprobador2( lstFacturasAprobar: DetallePresupuesto[] ): Observable<any> {
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/aprobarFacturasAprobador2`, lstFacturasAprobar );
    }

    rechazarFactura( facturaRechazada: DetallePresupuesto ): Observable<any> {
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/rechazarFactura`, facturaRechazada );
    }

    generarArchivoCI( idArea: number, idMes: number, mes: String): Observable<any> {
        return this.http.get( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/generarArchivoCI/${idArea}/${idMes}/${mes}`, { responseType: 'blob' } );
    }

    guardarDatosAhorro( detallePresupuesto: DetallePresupuesto ): Observable<any> {
        return this.http.post( `${this.URL_SRV_DETALLE_PRESUPUESTO}/detallePresupuesto/secure/crearAhorro`, detallePresupuesto );
    }

}
