import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Photo} from '../model/photo';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  BASE_URL = 'http://localhost:8080/photos';

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  /**
   * Requête : Obtenir la liste de toutes les photos
   */
  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.BASE_URL}`);
  }

  /**
   * Requête : Enregistrer une photo
   * @param photo L'objet photo à enregistrer
   */
  saveNewPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(`${this.BASE_URL}`, photo);
  }

  /**
   * Requête : Supprimer une photo
   * @param photoId L'id de l'objet photo à supprimer
   */
  deletePhoto(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()),
        catchError(this.es.handleError)
      );
  }

  /**
   * Requête : Obtenir la liste des photos d'un projet
   * @param  projet Le projet souhaité
   */
  getPhotosByProjet(projetId: number): Observable<Photo[]> {
    console.log(projetId)
    if (projetId = -1) {
      return this.getAllPhotos()
    } else {
      return this.http.get<Photo[]>(`${this.BASE_URL}/projets/${projetId}`)
        .pipe(catchError(this.es.handleError('Aucune photo trouvée pour ce projet'))
        );
    }
  }

  /**
   * Requête : Obtenir la liste des photos d'une categorie
   * @param  categorie La categorie souhaitée
   */
  getPhotosByCategorie(categorie: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.BASE_URL}/byCategorie?categorie=${categorie}`)
      .pipe(catchError(this.es.handleError('Aucune photo trouvée pour cette catégorie'))
      );
  }

  getPhotoById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.BASE_URL}/${id}`)
      .pipe(catchError(this.es.handleError('Erreur Id'))
      );
  }
}
