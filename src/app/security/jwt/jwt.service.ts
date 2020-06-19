import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorService} from "../../service/error.service";
import {Admin} from "../../model/admin";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private errorService: ErrorService) {
  }

  /**
   *Vérifie la présence d'un token
   */
  public isLogged(): boolean {
    return Boolean(this.getToken());
  }

  /**
   *Extrait le login de l'utilisateur
   */
  public getUsername(): string {
    if (this.isLogged()) {
      return this.userFromToken(this.getToken()).login;
    }
    return undefined;
  }

  /**
   *Extrait le rôle de l'utilisateur
   */
  public getRole(): string {
    if (this.isLogged()) {
      return this.userFromToken(this.getToken()).auth[0];
    }
    return undefined;
  }

  /**
   *Récupère le token session Storage
   */
  private getToken(): string {
    return sessionStorage.getItem('access_token');
  }

  /**
   *Enregistre le token dans session Storage
   * @param token
   */
  private setToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  /**
   * Efface le token session Storage
   */
  private clearToken() {
    sessionStorage.removeItem('access_token');
  }

  /**
   * envoie requête avec nom et password et traite la réponse du back
   * @param name de l'utilisateur
   * @param password de l'utilisateur
   */
  public login(name: string, password: string) {
    const user = {login: name, password: password};

    return this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/admins/sign-in`, user).pipe(
      tap(res => {
        this.setToken(res.access_token);
        this.storeAdmin();
      }));
  }

  /**
   * Appelle la méthode clearToken pour déconnecter l'utilisateur
   */
  public logout() {
    if (this.isLogged()) {
      this.errorService.handleSuccess("Vous êtes bien déconnecté");
      this.clearToken();
    }
  }

  /**
   * récupère les éléments de l'admin connecté
   */
  public getAdmin(): Admin {
    if (this.isLogged()) {
      const decodedToken = this.userFromToken(this.getToken());
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

  /**
   * Décode le token
   * @param token
   */
  private userFromToken(token: string): any {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }

  /**
   * met les infos de l'admin dans le session storage
   */
    private storeAdmin(){
    const admin = this.getAdmin();
    sessionStorage.setItem("admin", JSON.stringify(admin));
    }

  /**
   * récupère l'admin dans le session storage
   */
  public getStoredAdmin(): Admin {
      return JSON.parse(sessionStorage.getItem("admin"));
    }
  // /**
  //  *
  //  */
  // public isUnactived(): boolean {
  //   return Boolean(!this.getToken());
  // }

  // /**
  //  *
  //  */
  // public getPhoto(): string {
  //   if (this.isLogged()) {
  //     return this.userFromToken(this.getToken()).photo;
  //   }
  //   return undefined;
  // }
  //
  // /**
  //  *
  //  */
  // public getPrenom(): string {
  //   if (this.isLogged()) {
  //     return this.userFromToken(this.getToken()).prenom;
  //   }
  //   return undefined;
  // }
  //
  // /**
  //  *
  //  */
  // public getPresentation(): string {
  //   if (this.isLogged()) {
  //     return this.userFromToken(this.getToken()).presentation;
  //   }
  //   return undefined;
  // }

  // public register(name: string, password: string) {
  //   const user = {name: name, password: password};
  //
  //   this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/admins/sign-up`, user).pipe(tap(_ => {
  //     this.login(name, password);
  //   }));
  // }
}
