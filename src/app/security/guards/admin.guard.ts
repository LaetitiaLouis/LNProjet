import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtService} from "../jwt/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private jwtService: JwtService) {
  }

  /**
   *Vérifie le rôle de l'utilisateur
   */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    if (!this.jwtService.isLogged()) {
      return false;
    }else if (this.jwtService.getRole() === 'ADMIN') {
      return true
    }
    return false
  }
}
