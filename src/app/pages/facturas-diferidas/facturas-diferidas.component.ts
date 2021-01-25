import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';
import { ParametrosDiferidos } from '../../shared/model/parametros-diferidos';

@Component({
  selector: 'bi-facturas-diferidas',
  templateUrl: './facturas-diferidas.component.html',
  styles: []
})
export class FacturasDiferidasComponent implements OnInit {

  lstParametrosDiferidos: ParametrosDiferidos[] = [];
  parametroDiferido: ParametrosDiferidos;

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.inicializar();
  }

  inicializar() {
    
    this.parametroDiferido = {};
    this.catalogoService.cargarParametrosDiferidos().subscribe(res => {
      this.lstParametrosDiferidos = res;
    },
      err => {
        console.error('Error al cargar los parametros para diferidos');
      });
  }

}
