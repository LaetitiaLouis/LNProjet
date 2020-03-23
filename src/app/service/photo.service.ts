import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Photo} from '../model/photo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  BASE_URL = 'http://localhost/api/photo';

  constructor(private http: HttpClient) {
  }

  /**
   * Obtenir la liste de toutes les photos
   */
  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('${this.BASE_URL}/all');
  }
}
