import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {Projet} from '../model/projet';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Message} from "../model/message";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  BASE_URL = `${environment.apiUrl}/messages`;
  constructor(private http: HttpClient,
              private es: ErrorService) {
  }
  /**
   * Requête : Obtenir la liste des messages
   */
  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.BASE_URL}`);
  }

  /**
   * Requête : Enregistrer un nouveau Message
   * @param client L'objet message à enregistrer
   */
  saveNewMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.BASE_URL}`, message);
  }

  /**
   * Requête : Modifier un message
   * @param message L'objet message à modifier
   */
  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.BASE_URL}`, message)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Requête : Supprimer un message
   * @param id L'id du message à supprimer
   */
  deleteMessage(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
      );
  }

  getMessageById(id:number): Observable<Message> {
      return this.http.get<Message>(`${this.BASE_URL}/${id}`)
        // .pipe(catchError(this.es.handleError('Erreur Id')))
    ;
  }
}

