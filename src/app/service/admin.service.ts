import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Admin} from '../model/admin';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASE_URL = `${environment.apiUrl}/admins`;

  constructor(private http: HttpClient,
              private es: ErrorService) {
  }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.BASE_URL}`);
  }

  getAdminByLogin(login:string): Observable<Admin> {
    return this.http.get<Admin>(`${this.BASE_URL}/${login}`)
      .pipe(catchError(this.es.handleError('Erreur login'))
      );
  }

  /**
   * Requête : Enregistrer un nouvel administrateur
   * @param admin L'objet admin à enregistrer
   */
  registerAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.BASE_URL}`, admin);
  }

  /**
   * Requête : Modifier un administrateur
   * @param admin L'objet admin à modifier
   */
  updatedAdmin(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.BASE_URL}`, admin);
  }

  // /**
  //  * Requête : Supprimer un administrateur
  //  * @param id L'id de l'administrateur à supprimer
  //  */
  // deleteAdmin(id: number) {
  //   return this.http.delete(`${this.BASE_URL}/${id}`, {responseType: 'text'})
  //     .pipe(
  //       map(this.es.handleSuccess()),
  //       catchError(this.es.handleError())
  //     );
  // }

  /**
   * Requête : Vérifier si le login existe
   * @param login Le login à vérifier
   */
  checkIfLoginExists(login: string) {
    return this.http.get(`${this.BASE_URL}/loginExists?login=${login}`);
  }
}
