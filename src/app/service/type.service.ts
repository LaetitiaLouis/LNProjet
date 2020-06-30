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
   * Obtient la liste de tous les types
   */
  public getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.BASE_URL}`);
  }

  /**
   * Enregistre un nouveau type
   */
  public saveNewType(type: Type): Observable<Type> {
    return this.http.post<Type>(`${this.BASE_URL}`, type);
  }

  /**
   * Modifie un type
   */
  public updateType(type: Type): Observable<Type> {
    return this.http.put<Type>(`${this.BASE_URL}`, type);
  }

  /**
   * Supprime un type
   */
  public deleteType(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'});
  }
}
