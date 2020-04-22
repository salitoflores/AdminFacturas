import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import swal from 'sweetalert';

@Component({
  selector: 'bi-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

 
  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  Logout() {
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
    }
}
