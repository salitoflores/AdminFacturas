import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[bi-menu-nav]',
  templateUrl: './menu-nav.component.html',
  styleUrls: []
})
export class MenuNavComponent implements OnInit {

  listMenu = [];
  constructor(private router: Router, private menuService: MenuService) { }

  idRol: number;

  ngOnInit() {
    const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem('user'));
      this.idRol = decodedToken.idRol;
      console.log(this.idRol);
    this.menuService.cargarMenuArbol(this.idRol).subscribe(
      res => {
        this.listMenu = res;
        console.log(this.listMenu);
      }
    );
  }
  
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
