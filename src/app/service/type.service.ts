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
  public getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.BASE_URL}`);
  }

  /**
   * Enregistrer un nouveau type
   * @param  type L'objet type à enregistrer
   */
  public saveNewType(type: Type): Observable<Type> {
    return this.http.post<Type>(`${this.BASE_URL}`, type);
  }

  /**
   * Modifier un type
   */
  public updateType(type: Type): Observable<Type> {
    return this.http.put<Type>(`${this.BASE_URL}`, type);
  }

  /**
   * Supprimer un type
   */
  public deleteType(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'});
  }
}
