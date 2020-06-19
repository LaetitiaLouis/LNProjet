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
  }

  /**
   * Requête : Supprimer un client
   * @param id L'id du client à supprimer
   */
  deleteClient(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'});
  }

  /**
   * Requête : Obtenir un client via son Id
   * @param id l'id du client à afficher
   */
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.BASE_URL}/${id}`);
  }

  /**
   * Requête : Obtenir un client via son prénom ou son nom via une saisie partielle
   */
  getClientsByNomOrPrenom(recherche: string): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.BASE_URL}/findByNomOrPrenom?recherche=${recherche}`);

  }
}
