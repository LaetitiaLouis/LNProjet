import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {Projet} from '../model/projet';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  BASE_URL = 'http://loclahost:8080/message';
  constructor(private http: HttpClient,
              private es: ErrorService) {
  }
  /**
   * Requête : Obtenir la liste des messages
   *
   */
  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.BASE_URL}/`);
  }

  /**
   * Requête : Enregistrer un nouveau Message
   * @param client L'objet message à enregistrer
   */
  saveNewMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.BASE_URL}/new`, message);
  }

  /**
   * Requête : Modifier un message
   * @param message L'objet message à modifier
   */
  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.BASE_URL}/update`, message)
      .pipe(catchError(this.es.handleError()));
  }

  /**
   * Requête : Supprimer un message
   * @param id L'id du message à supprimer
   */
  deleteMessage(id: number) {
    return this.http.delete(`${this.BASE_URL}/delete?id=${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()), catchError(this.es.handleError())
      );
  }
}

