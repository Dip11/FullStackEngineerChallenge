import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    let token = localStorage.getItem('token');
    if(token){
      // let user = JSON.parse(localStorage.getItem('user'));
      return true;
    } else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
