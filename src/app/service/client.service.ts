import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Client} from '../model/client';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  BASE_URL = 'http://localhost:8080/clients';

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Requête : Obtenir la liste des clients
   *
   */
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.BASE_URL}`);
  }

  /**
   * Requête : Enregistrer un nouveau client
   * @param client L'objet client à enregistrer
   */
  saveNewClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.BASE_URL}`, client);
  }

  /**
   * Requête : Modifier un client
   * @param client L'objet client à modifier
   */
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.BASE_URL}`, client)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Requête : Supprimer un client
   * @param id L'id du client à supprimer
   */
  deleteClient(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
      );
  }

  /**
   * Requête : Obtenir un client via son Id
   * @param id l'id du client à afficher
   */
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.BASE_URL}/${id}`)
      .pipe(catchError(this.es.handleError('Erreur Id'))
      );
  }

  getClientsByNomAndPrenom(recherche: string): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.BASE_URL}/findByNomAndPrenom?recherche=${recherche}`);

  }
}
