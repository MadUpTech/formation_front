import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationClientGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.roles.includes("ROLE_CLIENT")) {
      return true;
    } else {
      this.router.navigateByUrl("/connexion")
      window.localStorage.clear()
      window.location.reload()
      return false;
    }
  }

}
