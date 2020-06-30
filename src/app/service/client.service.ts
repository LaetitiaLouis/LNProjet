import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Client} from '../model/client';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  BASE_URL = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Obtient la liste des clients
   */
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.BASE_URL}`);
  }

  /**
   * Enregistre un nouveau client
   */
  saveNewClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.BASE_URL}`, client);
  }

  /**
   * Modifie un client
   */
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.BASE_URL}`, client)
  }

  /**
   * Supprime un client
   */
  deleteClient(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'});
  }

  /**
   * Obtient un client via son prénom ou son nom via une saisie partielle
   */
  getClientsByNomOrPrenom(recherche: string): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.BASE_URL}/findByNomOrPrenom?recherche=${recherche}`);
  }

  /**
   * Obtient un client via son Id
   */
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.BASE_URL}/${id}`);
  }
}
