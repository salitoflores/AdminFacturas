import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'bi-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

    usuario: Usuario;

  constructor(private router: Router) { }

  ngOnInit() {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      console.log(this.usuario);
  }

  Logout() {
      localStorage.clear();
      this.router.navigate(['/login']);
  }

}
