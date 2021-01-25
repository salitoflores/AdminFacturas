import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Catalogo } from '../shared/model/catalogo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ParametrosDiferidos } from '../shared/model/parametros-diferidos';

@Injectable( {
    providedIn: 'root'
} )
export class CatalogoService {

    readonly URL_SRV_PRESUPUESTO = environment.urlSrvPresupuesto;

    constructor( private http: HttpClient ) { }

    guardarDatosCatalogo( catalogo: Catalogo ): Observable<any> {
        return this.http.post( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/crearCatalogo`, catalogo );
    }

    listarCatalogos(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/listarCatalogos` );
    }

    buscarCatalogos ( flagPadre: number ): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/buscarCatalogos/${flagPadre}` );
    }

    buscarCuentasTipoGasto( idTipoGasto: number ): Observable<any> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/buscarCuentasTipoGasto/${idTipoGasto}`);
    }

    buscarCatalogoPorId ( id: number ): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/buscarCatalogoPorId/${id}` );
    }

    buscarCatalogoPorDescripcion ( descripcion: String ): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/buscarCatalogoPorDescripcion/${descripcion}` );
    }

    listarTipoCatalogo(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/listarTipoCatalogo` );
    }

    buscarMesFechaActual(): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/buscarMesFechaActual/` );
    }

    cargarParametrosDiferidos(): Observable<any> {
        return this.http.get<ParametrosDiferidos[]>( `${this.URL_SRV_PRESUPUESTO}/catalogo/secure/cargarParametrosDiferidos` );
    }

}
