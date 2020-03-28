import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';
import {Type} from '../model/type';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  BASE_URL = 'http://localhost:8080/type';
  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Requête : Obtenir la liste de tous les types
   */
  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.BASE_URL}/`);
  }

  /**
   * Requête : Enregistrer un nouveau type
   * @param  type L'objet type à enregistrer
   */
  saveNewType(type: Type): Observable<Type> {
    return this.http.post<Type>(`${this.BASE_URL}/new`, type);
  }

  /**
   * Requête : Modifier un type
   * @param  type L'objet type à modifier
   */
  updateType(type: Type): Observable<Type> {
    return this.http.put<Type>(`${this.BASE_URL}/update`, type)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Requête : Supprimer un type
   * @param id L'id du type à supprimer
   */
  deleteType(id: number) {
    return this.http.delete(`${this.BASE_URL}/delete?id=${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
      );
  }
}
