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
        return this.http.post( `${this.URL_SRV_CATALOGO}/secure/crearCatalogo`, catalogo );
    }

    listarCatalogos(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/secure/listarCatalogos` );
    }

    buscarCatalogos ( flagPadre: number ): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_CATALOGO}/secure/buscarCatalogos/${flagPadre}` );
    }

    buscarCuentasTipoGasto( idTipoGasto: number ): Observable<any> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/secure/buscarCuentasTipoGasto/${idTipoGasto}`);
    }

    buscarCatalogoPorId ( id: number ): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_CATALOGO}/secure/buscarCatalogoPorId/${id}` );
    }

    buscarCatalogoPorDescripcion ( descripcion: String ): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_CATALOGO}/secure/buscarCatalogoPorDescripcion/${descripcion}` );
    }

    listarTipoCatalogo(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>( `${this.URL_SRV_CATALOGO}/secure/listarTipoCatalogo` );
    }

    buscarMesFechaActual(): Observable<any> {
        return this.http.get<Catalogo>( `${this.URL_SRV_CATALOGO}/secure/buscarMesFechaActual/` );
    }

}
