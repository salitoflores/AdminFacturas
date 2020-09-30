import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogo } from '../shared/model/catalogo';
import { Proveedor } from '../shared/model/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

    readonly URL_SRV_PROVEEDOR = environment.urlSrvProveedor;

    constructor( private http: HttpClient ) { }

    buscarFormulario( id: number ): Observable<any> {
        return this.http.get( `${this.URL_SRV_PROVEEDOR}/buscarFormulario/${id}`, { responseType: 'blob' } );
    }

    buscarCertificado( id: number ): Observable<any> {
        return this.http.get( `${this.URL_SRV_PROVEEDOR}/buscarCertificado/${id}`, { responseType: 'blob' } );
    }

    guardarProveedor( proveedorCatalogo: Catalogo, proveedor: Proveedor, fileFormulario: File, fileCertificado: File ): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('proveedorCatalogo', JSON.stringify(proveedorCatalogo));
        formData.append('proveedor', JSON.stringify(proveedor));
        formData.append('fileFormulario', fileFormulario);
        formData.append('fileCertificado', fileCertificado);
        return this.http.post( `${this.URL_SRV_PROVEEDOR}/secure/crearProveedor`, formData );
    }

    cargarListaProveedores(): Observable<Proveedor[]> {
        return this.http.get<Proveedor[]>( `${this.URL_SRV_PROVEEDOR}/secure/cargarListaProveedores` );
    }

}
