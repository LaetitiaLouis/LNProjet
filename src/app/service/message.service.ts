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
   * Obtient la liste des messages
   */
  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.BASE_URL}`);
  }

  /**
   * Enregistre un nouveau Message
   */
  saveNewMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.BASE_URL}`, message);
  }

  /**
   * Modifie un message
   */
  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.BASE_URL}`, message);
  }

  /**
   * Supprime un message
   */
  deleteMessage(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'});
  }

  /**
   * Recherche un message via son id
   */
  getMessageById(id:number): Observable<Message> {
      return this.http.get<Message>(`${this.BASE_URL}/${id}`)
        // .pipe(catchError(this.es.handleError('Erreur Id')))
    ;
  }
}

