import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Projet} from '../model/projet';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  BASE_URL = `${environment.apiUrl}/projets`;

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Obtenir la liste de tous les projets
   */
  public getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.BASE_URL}`);
  }

  /**
   * Enregistrer un nouveau projet
   */
  public saveProjetInfos(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.BASE_URL}`, projet);
  }

  /**
   * Modifier un projet
   */
  public updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.BASE_URL}`, projet)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Supprimer un projet
   */
  public deleteProjet(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
      );
  }

  /**
   * Rechercher une liste de projets par type
   */
  public getProjetsByType(typeId: number): Observable<Projet[]> {
    console.log(typeId);
    if (typeId === -1) {
      return this.getAllProjets();
    } else {
      return this.http.get<Projet[]>(`${this.BASE_URL}/types/${typeId}`)
        .pipe(catchError(this.es.handleError('Aucun projet ne correspond à ce type'))
        );
    }
  }

  /**
   * Rechercher un projet via son id
   */
  public getProjetsById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.BASE_URL}/${id}`)
      .pipe(catchError(this.es.handleError())
      );
  }

  /**
   * Afficher les projets par prestation
   */
  public getProjetsByPrestation(prestationId: number): Observable<Projet[]> {
    console.log(prestationId);
    if (prestationId === -1) {
      return this.getAllProjets();
    } else {
      return this.http.get<Projet>(`${this.BASE_URL}/prestations/${prestationId}`)
        .pipe(catchError(this.es.handleError())
        );
    }
  }

  /**
   * Afficher les projets par admin
   */
  public getProjetsByAdmin(adminLogin: string): Observable<Projet[]> {
    console.log(adminLogin);
    if (adminLogin === "") {
      return this.getAllProjets();
    } else {
      return this.http.get<Projet[]>(`${this.BASE_URL}/admins/${adminLogin}`)
        .pipe(catchError(this.es.handleError())
        );
    }
  }

  /**
   Requête : Obtenir un client via son prénom ou son nom via une saisie partielle
   */
  public getProjetsByTypeOrIntitule(recherche: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.BASE_URL}/findByTypeOrIntitule?recherche=${recherche}`);
  }

}
