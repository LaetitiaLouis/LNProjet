import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';
import {Admin} from '../model/admin';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient,
              private router: Router,
              private es: ErrorService) {
  }

  /**
   * Requête : Vérifier si les identifiants correspondent :
   * Si oui enregistrer le login dans le session storage
   * Si non afficher un message d'erreur
   * @param login dans le champ login du formulaire
   * @param password Le champ mot de passe du formulaire
   */
  login(login, password): Observable<Admin> {
    return this.http.post<Admin>('http://localhost:8080/admin/connect', {login, password}).
      pipe(
        tap(admin => sessionStorage.setItem('login', admin.login)),
        map(result => this.router.navigate(['/Authentification'])),
        catchError(this.es.handleError('Login ou mot de passe invalide'))
  );
  }

  /**
   * Se déconnecter en supprimant le champ login du session storage
   */
  logout() {
    sessionStorage.removeItem('login');
    this.router.navigate(['/connexion']);
  }
}
