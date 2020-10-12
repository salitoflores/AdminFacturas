import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bi-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: []
})
export class ContratoComponent implements OnInit {

  flagListado: boolean;  

  constructor() { }

  ngOnInit() {
    this.inicializarObjetos();
  }

  inicializarObjetos() {
    this.flagListado = true;
  }

}
