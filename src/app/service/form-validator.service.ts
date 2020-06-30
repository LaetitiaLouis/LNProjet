import {Injectable} from '@angular/core';
import {AdminService} from "./admin.service";
import {AbstractControl, AsyncValidatorFn, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

/**
 * Interface obligatoire pour le retour des validateurs
 */
interface ValidatorsErrors {
  [key: string]: any;

}

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor(private adminService: AdminService) {
  }

  /**
   * validateur d'unicité de login
   */
  loginExits(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidatorsErrors | null> => {
      return this.checkIfLoginExists(control.value).pipe
      (map(res => {
          return res ? {loginExists: true} : null;
        })
      );
    };
  }

  /**
   * demande au serveur si le login existe
   */
  checkIfLoginExists(login: string) {
    return this.adminService.checkIfLoginExists(login);
  }

  /**
   * validateur vérifiant si 2 adresses mails correspondent
   * @param control le formulaire
   */
  emailMatch(control: FormControl) {
    const email = control.get('email').value;
    const confirmEmail = control.get('confirmEmail').value;

    if (email !== confirmEmail) {
      control.get('confirmEmail').setErrors({emailMismatch: true});
    }
  }

  /**
   * validateur vérifiant si 2 mots de passe correspondent
   * @param control
   */

  passwordMatch(control: FormControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({passwordMismatch: true});
    }
  }

}

