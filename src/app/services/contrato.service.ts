import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../shared/model/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  readonly URL_SRV_PRESUPUESTO = environment.urlSrvPresupuesto;

  constructor(private http: HttpClient) { }

  cargarContratosProveedor(id: number): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.URL_SRV_PRESUPUESTO}/contrato/secure/cargarContratosProveedor/${id}`);
  }

  guardarContrato(contrato: Contrato, documento: File): Observable<any> {
    console.log("Llega al servicio");
    const formData: FormData = new FormData();
    formData.append('contrato', JSON.stringify(contrato));
    formData.append('documento', documento);
    return this.http.post(`${this.URL_SRV_PRESUPUESTO}/contrato/secure/guardarContrato`, formData);
  }

  buscarDocumento(id: number): Observable<any> {
    return this.http.get(`${this.URL_SRV_PRESUPUESTO}/contrato/buscarDocumento/${id}`, { responseType: 'blob' });
  }

}
