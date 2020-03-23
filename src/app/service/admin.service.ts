import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Admin} from '../model/admin';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASE_URL = 'http:localhost:8080/api/admin';

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Requête : Enregistrer un nouvel administrateur
   * @param admin L'objet admin à enregistrer
   */
  registerAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.BASE_URL}/new`, admin);
  }

  /**
   * Requête : Modifier un administrateur
   * @param admin L'objet admin à modifier
   */
  updatedAdmin(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.BASE_URL}/update`, admin);
  }

  /**
   * Requête : Supprimer un administrateur
   * @param id L'id de l'administrateur à supprimer
   */
   deleteAdmin(id: number) {
     return this.http.delete(`${this.BASE_URL}/delete?id=${id}`, {responseType: 'text'})
       .pipe(
         map(this.es.handleSuccess()),
         catchError(this.es.handleError())
       );
  }

  /**
   * Requête : Vérifier si le login existe
   * @param login Le login à vérifier
   */
  checkIfLoginExists(login: string) {
    return this.http.get(`${this.BASE_URL}/loginExists?login=${login}`);
  }
}
