import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Projet} from '../model/projet';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorService} from './error.service';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  BASE_URL = 'http://localhost:8080/projets';

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Requête : Obtenir la liste de tous les projets
   */
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.BASE_URL}`);
  }

  /**
   * Requête : Enregistrer un nouveau projet
   * @param projet L'objet projet à enregistrer
   */
  saveProjetInfos(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.BASE_URL}`, projet);
  }

  /**
   * Requête : Modifier un projet
   * @param projet L'objet projet à modifier
   */
  updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.BASE_URL}`, projet)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Requête : Supprimer un projet
   * @param id L'id du projet à supprimer
   */
  deleteProjet(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
      );
  }

  /**
   * Requête : Rechercher une liste de projets par type
   * @param type Le type souhaité
   */
  getProjetsByType(typeId: number): Observable<Projet[]> {
    console.log(typeId);
    if (typeId === -1) {
      return this.getAllProjets();
    } else {
      return this.http.get<Projet[]>(`${this.BASE_URL}/types/${typeId}`)
        .pipe(catchError(this.es.handleError('Aucun projet ne correspond à ce type'))
        );
    }
  }

  getProjetsById(id: number): Observable<Projet> {
    console.log(id);
    return this.http.get<Projet>(`${this.BASE_URL}/${id}`)
      .pipe(catchError(this.es.handleError())
      );
  }

  getProjetsByPrestation(prestationId: number): Observable<Projet[]> {
    console.log(prestationId);
    if (prestationId === -1) {
      return this.getAllProjets();
    } else {
      return this.http.get<Projet>(`${this.BASE_URL}/prestations/${prestationId}`)
        .pipe(catchError(this.es.handleError())
        );
    }
  }

  getProjetsByAdmin(adminLogin: string): Observable<Projet[]> {
    console.log(adminLogin);
    if (adminLogin === "") {
      return this.getAllProjets();
    }else{
      return this.http.get<Projet[]>(`${this.BASE_URL}/admins/${adminLogin}`)
        .pipe(catchError(this.es.handleError())
        );
    }
  }
}
