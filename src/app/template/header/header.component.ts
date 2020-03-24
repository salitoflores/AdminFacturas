import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'bi-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

    usuario: Usuario = {};

  constructor(private router: Router) { }

  ngOnInit() {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem('user'));
      this.usuario.usDescripcionUsuario = decodedToken.nombreCompletousuario;
      // console.log(this.usuario);
  }

  Logout() {
      localStorage.clear();
      this.router.navigate(['/login']);
  }

}
