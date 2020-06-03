import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';
import {Type} from '../model/type';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  BASE_URL = `${environment.apiUrl}/types`;

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Obtenir la liste de tous les types
   */
  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.BASE_URL}`);
  }

  /**
   * Enregistrer un nouveau type
   * @param  type L'objet type à enregistrer
   */
  saveNewType(type: Type): Observable<Type> {
    return this.http.post<Type>(`${this.BASE_URL}`, type);
  }

  /**
   * Modifier un type
   */
  updateType(type: Type): Observable<Type> {
    return this.http.put<Type>(`${this.BASE_URL}`, type)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Supprimer un type
   */
  deleteType(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
      );
  }
}
