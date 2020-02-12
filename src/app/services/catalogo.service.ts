import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Catalogo } from '../shared/model/catalogo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable( {
    providedIn: 'root'
} )
export class CatalogoService {

    readonly URL_SRV_CATALOGO = environment.urlSrvCatalogo;

    constructor( private http: HttpClient ) { }

    guardarDatosCatalogo( catalogo: Catalogo ): Observable<any> {
        return this.http.post( `${this.URL_SRV_CATALOGO}/crearCatalogo`, catalogo );
    }

    listarCatalogos(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCatalogos` );
    }

    listarCodigosCatalogosCuentaContable(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaCuentaContable` );
    }

    buscarCatalogos ( flagPadre: number ): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_CATALOGO}/buscarCatalogos/${flagPadre}` );
    }

    buscarCuentasTipoGasto( idTipoGasto: number ): Observable<any> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/buscarCuentasTipoGasto/${idTipoGasto}`);
    }

    listarCodigosCatalogosProveedor(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaProveedor` );
    }

    listarCodigosCatalogosFabricante(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaFabricante` );
    }

    listarCodigosCatalogosArea(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaArea` );
    }

    listarCodigosCatalogosCentroCosto(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaCentroCosto` );
    }

    listarCodigosCatalogosServicio(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaServicio` );
    }

    listarCodigosCatalogosResponsable(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaResponsable` );
    }

    listarCodigosCatalogosCriticidad(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaCriticidad` );
    }

    listarCodigosCatalogosBajoContrato(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaBajoContrato` );
    }

    listarCodigosCatalogosAccionTomar(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaAccionTomar` );
    }

    listarCodigosCatalogosModoPago(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaModoPago` );
    }

    listarCodigosCatalogosTipologia(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaTipologia` );
    }

    listarCodigosCatalogosTipoGasto(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaTipoGasto` );
    }

    listarCodigosCatalogosEstado(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaEstado` );
    }

    listarCodigosCatalogosTipoEjecucion(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaTipoEjecucion` );
    }

    listarCodigosCatalogosFuncion(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaFuncion` );
    }

    listarCodigosCatalogosMes(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarCodigosTablaMes` );
    }

    buscarCatalogoPorId ( id: number ): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_CATALOGO}/buscarCatalogoPorId/${id}` );
    }

    listarTipoCatalogo(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/listarTipoCatalogo` );
    }

}
