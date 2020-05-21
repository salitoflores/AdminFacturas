import { Component, OnInit } from '@angular/core';
import { FechasAutorizadas } from '../../shared/model/fechas-autorizadas';
import { FechasAutorizadasService } from '../../services/fechasAutorizadas.service';

@Component({
  selector: 'bi-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  display: boolean;
  fechasAut: FechasAutorizadas;

  constructor(private fechasAutorizadasService : FechasAutorizadasService ) { }

  ngOnInit() {
    this.display = true;
    this.fechasAut = {};
    this.fechasAutorizadasService.recuperarFechas().subscribe( res => {
      this.fechasAut = res;
      console.log(this.fechasAut);
  },
      err => {
          console.error( err );
      } );
  }

}
