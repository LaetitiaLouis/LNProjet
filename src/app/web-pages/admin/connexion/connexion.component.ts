import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtService} from "../../../security/jwt/jwt.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup;
  submitted = false;
  showPassword= false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private error: ErrorService,
              private jwtService: JwtService) {
  }

  public ngOnInit(): void {
    this.connexionForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * valide la connexion de l'utilisateur
   */
  public onSubmit() {
    const login = this.connexionForm.controls.login.value;
    const password = this.connexionForm.controls.password.value;
    this.jwtService.login(login, password).subscribe(_=> {
      this.error.handleSuccess("Vous êtes bien connecté");
      this.router.navigate(['/profil']);
  console.log()
    },_=>this.error.handleError("Erreur : login ou mot de passe invalide")
    );
     }

  /**
   * Getter pour obtenir les control du formulaire
   */
  public get f() {
    return this.connexionForm.controls;
  }
}
