import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Prestation} from '../model/prestation';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  BASE_URL = 'http://localhost:8080/prestations';

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  getAllPrestations(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.BASE_URL}`);
  }

  /**
   * Requête : Enregistrer une nouvelle prestation
   * @param prestation L'objet prestation à enregistrer
   */
  saveNewPrestation(prestation: Prestation): Observable<Prestation> {
    return this.http.post<Prestation>(`${this.BASE_URL}`, prestation);
  }

  /**
   * Requête : Modifier une prestation
   * @param prestation L'objet prestation à modifier
   */
  updatePrestation(prestation: Prestation): Observable<Prestation> {
    return this.http.put<Prestation>(`${this.BASE_URL}`, prestation);
  }

  /**
   * Requête : Supprimer une prestation
   * @param id L'id de la prestation à supprimer
   */
  deletePrestation(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
      .pipe(
        map(this.es.handleSuccess()),
        catchError(this.es.handleError())
      );
  }

  // /**
  //  * Requête : Obtenir une liste de prestations par projet
  //  * @param projet L'objet projet recherché
  //  */
  // getAllPrestationsByProjet(projet: Projet): Observable<Prestation[]> {
  //   return this.http.get<Prestation[]>(`${this.BASE_URL}/findByProjet?projet=${projet}`)
  //     .pipe(catchError(this.es.handleError('Aucune prestation trouvée pour ce projet'))
  //     );
  // }
  //   /**
  //    * Requête : Obtenir une liste de prestations par client
  //    * @param client L'objet client recherché
  //    */
  //   getAllPrestationsByClient(client: Client): Observable<Prestation[]> {
  //     return this.http.get<Prestation[]>(`${this.BASE_URL}/findByClient?client=${client}`)
  //       .pipe(catchError(this.es.handleError('Aucune prestation trouvée pour ce projet'))
  //       );
  // }
}
