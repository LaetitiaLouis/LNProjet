import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../service/authentification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private auth: AuthentificationService) { }

  ngOnInit(): void {
    this.connexionForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Requête : Vérification du login et du password
   * @param form Le formuliare de connexion
   */
  onSubmit(form) {
    this.submitted = true;
    if (this.connexionForm.invalid) {return; }
    this.auth.login(form.login, form.password).subscribe();
  }

  get f() {return this.connexionForm.controls; }
}
