import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtService} from "../jwt/jwt.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private jwtService: JwtService) {
  }

  ngOnInit(): void {
    this.connexionForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const login = this.connexionForm.controls.login.value;
    const password = this.connexionForm.controls.password.value;
    this.jwtService.login(login, password).subscribe(data => console.log(data));
     }

  get f() {
    return this.connexionForm.controls;
  }
}
