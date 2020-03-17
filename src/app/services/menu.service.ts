import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../shared/model/menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

    readonly URL_SRV_MENU = environment.urlSrvMenu;

    constructor( private http: HttpClient ) { }

    cargarMenusRegistrados(): Observable<Menu[]> {
        return this.http.get<Menu[]>( `${this.URL_SRV_MENU}/secure/cargarMenusRegistrados` );
    }

    guardarMenu( menu: Menu ): Observable<any> {
        return this.http.post( `${this.URL_SRV_MENU}/secure/crearMenu`, menu );
    }

}
