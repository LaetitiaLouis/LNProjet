import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorService} from "../service/error.service";
import {Admin} from "../model/admin";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient, private router: Router, private errorService: ErrorService) {
  }

  isLogged(): boolean {
    return Boolean(JwtService.getToken());
  }

  isUnactived(): boolean {
    return Boolean(JwtService.getToken());
  }

  getUsername(): string {
    if (this.isLogged()) {
      return JwtService.userFromToken(JwtService.getToken()).login;
    }
    return undefined;
  }

  getPhoto(): string {
    if(this.isLogged()){
      return JwtService.userFromToken(JwtService.getToken()).photo;
    }
    return undefined;
  }

  getPrenom(): string {
    if (this.isLogged()) {
      return JwtService.userFromToken(JwtService.getToken()).prenom;
    }
    return undefined;
  }

  getPresentation(): string {
    if (this.isLogged()) {
      return JwtService.userFromToken(JwtService.getToken()).presentation;
    }
    return undefined;
  }

  getRole(): string {
    if (this.isLogged()) {
      console.log(JwtService.userFromToken(JwtService.getToken()))
      return JwtService.userFromToken(JwtService.getToken()).auth[0];
    }
    return undefined;
  }

  private static getToken(): string {
    return sessionStorage.getItem('access_token');
  }

  private static setToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  private static clearToken() {
    sessionStorage.removeItem('access_token');
  }

  login(name: string, password: string) {
    const user = {login: name, password: password};

    return this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/admins/sign-in`, user).pipe(
      tap(res => {
        JwtService.setToken(res.access_token);
        this.router.navigate(['/profil'])
      }),
      map(this.errorService.handleSuccess("Vous êtes bien connecté")),
      catchError(this.errorService.handleError('Erreur de connexion, login ou mot de passe invalide'))
    );
  }

  // TODO add a register form
  register(name: string, password: string) {
    const user = {name: name, password: password};

    this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/admins/sign-up`, user).pipe(tap(_ => {
      this.login(name, password);
      // this.getAdmin();
    }));
  //   register(admin: Admin) {
  //     const user = Admin;
  //
  //     this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/admins/sign-up`, user).pipe(tap(_ => {
  //       // this.login(name, password);
  //       this.getAdmin();
  //     }));
  }



  logout() {
    if (this.isLogged()) {
      this.errorService.handleSuccess(`${this.getUsername()} disconnected`);
      JwtService.clearToken();
    }
  }

  getAdmin(): Admin{
    if (this.isLogged()) {
      const decodedToken = JwtService.userFromToken(JwtService.getToken());
      const admin = new Admin();
      admin.login = decodedToken.sub;
      admin.photo = decodedToken.photo;
      admin.role = decodedToken.auth[0];
      admin.presentation = decodedToken.presentation;
      admin.prenom = decodedToken.prenom;
      return admin;
    }
    return undefined;
  }

  private static userFromToken(token: string): any{
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }
}
