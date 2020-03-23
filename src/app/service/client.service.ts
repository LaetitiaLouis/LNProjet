import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Client} from '../model/client';
import {Observable} from 'rxjs';
import {Projet} from '../model/projet';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  BASE_URL = 'http://localhost:8080/api/client';

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Requête : Obtenir la liste des clients
   *
   */
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.BASE_URL}/`);
  }

  /**
   * Requête : Enregistrer un nouveau client
   * @param client L'objet client à enregistrer
   */
  saveNewClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.BASE_URL}/new`, client);
  }

  /**
   * Requête : Modifier un client
   * @param client L'objet client à modifier
   */
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.BASE_URL}/update`, client)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Requête : Supprimer un client
   * @param id L'id du client à supprimer
   */
  deleteClient(id: number) {
    return this.http.delete(`${this.BASE_URL}/delete?id=${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
      );
  }
}
