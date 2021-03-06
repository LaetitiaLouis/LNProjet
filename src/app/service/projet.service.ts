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
   * Obtient la liste de tous les projets
   */
  public getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.BASE_URL}`);
  }

  /**
   * Enregistre un nouveau projet
   */
  public saveProjetInfos(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.BASE_URL}`, projet);
  }

  /**
   * Modifie un projet
   */
  public updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.BASE_URL}`, projet);
  }

  /**
   * Supprime un projet
   */
  public deleteProjet(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'});
  }

  /**
   * Recherche une liste de projets par type
   */
  public getProjetsByType(typeId: number): Observable<Projet[]> {
    console.log(typeId);
    if (typeId === -1) {
      return this.getAllProjets();
    } else {
      return this.http.get<Projet[]>(`${this.BASE_URL}/types/${typeId}`);
    }
  }

  /**
   * Recherche un projet via son id
   */
  public getProjetsById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.BASE_URL}/${id}`);
  }


  /**
   * Obtient un client via son prénom ou son nom via une saisie partielle
   */
  public getProjetsByTypeOrIntitule(recherche: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.BASE_URL}/findByTypeOrIntitule?recherche=${recherche}`);
  }

  /**
   * Affiche les projets par admin
   */
  public getProjetsByAdmin(adminLogin: string): Observable<Projet[]> {
    console.log(adminLogin);
    if (adminLogin === "") {
      return this.getAllProjets();
    } else {
      return this.http.get<Projet[]>(`${this.BASE_URL}/admins/${adminLogin}`);
    }
  }
}
