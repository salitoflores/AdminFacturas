import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FechasAutorizadas } from '../shared/model/fechas-autorizadas';
@Injectable({
  providedIn: 'root'
})
export class FechasAutorizadasService {
  readonly URL_SRV_FECHAS_AUTORIZADAS = environment.utlSrvFechasAutorizadas;
  constructor(private http: HttpClient) { }
  recuperarFechas(): Observable<any> {
    return this.http.get<FechasAutorizadas>(`${this.URL_SRV_FECHAS_AUTORIZADAS}/secure/recuperarFechas`);
  }
}
