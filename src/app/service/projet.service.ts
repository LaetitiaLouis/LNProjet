import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Projet} from '../model/projet';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {Type} from '../model/type';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  BASE_URL = 'http://localhost:8080/projet';

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Requête : Obtenir la liste de tous les projets
   */
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.BASE_URL}/`);
  }

  /**
   * Requête : Enregistrer un nouveau projet
   * @param projet L'objet projet à enregistrer
   */
  saveProjetInfos(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.BASE_URL}/new`, projet);
  }

  /**
   * Requête : Modifier un projet
   * @param projet L'objet projet à modifier
   */
  updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.BASE_URL}/update`, projet)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Requête : Supprimer un projet
   * @param id L'id du projet à supprimer
   */
  deleteProjet(id: number) {
    return this.http.delete(`${this.BASE_URL}/delete?id=${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
    );
  }

  /**
   * Requête : Rechercher une liste de projets par type
   * @param type Le type souhaité
   */
  getProjetsByType(type: Type): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.BASE_URL}/findByType?type=${type}`)
      .pipe(catchError(this.es.handleError('Aucun projet ne correspond à ce type'))
      );
  }
}
