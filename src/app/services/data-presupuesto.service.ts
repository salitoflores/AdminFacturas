import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataPresupuestoService {

    _dato: any;

  constructor() { }
  
  get dato() {
      return this._dato;
  }
  
  set dato(dato: any) {
      this._dato = dato;
  }
}
