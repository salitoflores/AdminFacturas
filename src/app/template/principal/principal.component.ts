import { Component, OnInit } from '@angular/core';
import { FechasAutorizadas } from '../../shared/model/fechas-autorizadas';
import { FechasAutorizadasService } from '../../services/fechasAutorizadas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bi-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  display: boolean;
  fechasAut: FechasAutorizadas;

  constructor(private fechasAutorizadasService: FechasAutorizadasService, private router: Router) { }

  ngOnInit() {
    this.display = true;
    this.fechasAut = {};
    this.fechasAutorizadasService.recuperarFechas().subscribe(res => {
      this.fechasAut = res;
      console.log(this.fechasAut);
    },
      err => {
        if (err.error.mensaje === "El token ha expirado, ingrese nuevamente") {
          localStorage.removeItem('userToken');
          this.router.navigate(['/login']);
        }
      });
  }

}
