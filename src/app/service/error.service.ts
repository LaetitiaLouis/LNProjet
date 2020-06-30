import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';

interface Error {
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) {
  }

  /**
   * Affiche la boîte contenant les messages
   * @param message Le message à afficher
   * @param action Le texte du bouton qui ferme la boîte
   * @param error True si c'est un message d'erreur sinon False
   */
  openSnackBar(message: string, action: string, error: boolean) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: error ? 'error-dialog' : 'success-dialog'
    });
  }

  /**
   * Gère les messages d'erreurs
   * @param message Le message à afficher
   */
  handleError(message?: string) {
      this.openSnackBar(message, 'Ok', true);
  }

    /**
     * Gère les messages positifs
     * @param message Le message à afficher
     */
    handleSuccess(message?: string) {
        this.openSnackBar(message , 'Ok', false);
    }
}
