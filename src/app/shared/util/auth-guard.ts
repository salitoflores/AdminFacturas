import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (localStorage.getItem('user')) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (localStorage.getItem('user')) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }

}
