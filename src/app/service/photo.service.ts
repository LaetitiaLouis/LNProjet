import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Photo} from '../model/photo';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  BASE_URL = `${environment.apiUrl}/photos`;

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Obtient la liste de toutes les photos
   */
  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.BASE_URL}`);
  }


  /**
   * Requête : Obtenir la liste des photos d'un projet
   */
  getPhotosByProjet(projetId: number): Observable<Photo[]> {
    if (projetId === -1) {
      return this.getAllPhotos()
    } else {
      return this.http.get<Photo[]>(`${this.BASE_URL}/projets/${projetId}`);
    }
  }

  /**
   * Requête : Obtenir la liste des photos d'une categorie
   */
  getPhotosByCategorie(categorie: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.BASE_URL}/byCategorie?categorie=${categorie}`)
      ;
  }

  /**
   * Enregistre une photo
   */
  saveNewPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(`${this.BASE_URL}`, photo);
  }

  /**
   * Supprime une photo
   */
  deletePhoto(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
  }

  getPhotoById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.BASE_URL}/${id}`)
      ;
  }
}
