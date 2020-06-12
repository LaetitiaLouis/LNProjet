import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtService} from "../../../security/jwt/jwt.service";
import {Router} from "@angular/router";

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
              private jwtService: JwtService) {
  }

  public ngOnInit(): void {
    this.connexionForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit() {
    const login = this.connexionForm.controls.login.value;
    const password = this.connexionForm.controls.password.value;
    this.jwtService.login(login, password).subscribe(_=>this.router.navigate(['/profil']));
     }

  public get f() {
    return this.connexionForm.controls;
  }
}
