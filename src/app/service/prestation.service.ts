import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Prestation} from '../model/prestation';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  BASE_URL = `${environment.apiUrl}/prestations`;

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  getAllPrestations(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.BASE_URL}`);
  }

  /**
   * Enregistre une nouvelle prestation
   */
  saveNewPrestation(prestation: Prestation): Observable<Prestation> {
    return this.http.post<Prestation>(`${this.BASE_URL}`, prestation);
  }

  /**
   * Modifie une prestation
   */
  updatePrestation(prestation: Prestation): Observable<Prestation> {
    return this.http.put<Prestation>(`${this.BASE_URL}`, prestation);
  }

  /**
   * Supprime une prestation
   */
  deletePrestation(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'});
  }
}
