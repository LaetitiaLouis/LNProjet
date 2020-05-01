import {Component, Input, OnInit} from '@angular/core';
import {Admin} from "../../../model/admin";
import {JwtService} from "../../../jwt/jwt.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../service/admin.service";

@Component({
  selector: 'app-detail-modif-profil',
  templateUrl: './detail-modif-profil.component.html',
  styleUrls: ['./detail-modif-profil.component.css']
})
export class DetailModifProfilComponent implements OnInit {
  // @Input() creation: boolean = false;
  public admin: Admin;
  public formBody: FormGroup;

  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // récupération de l'admin connecté
    this.admin = this.jwtService.getAdmin();
    this.formBody = this.fb.group({
      prenom: [{value: this.admin.prenom, disabled: true}],
      login: [{value: this.admin.login, disabled: true}],
      password: [{value: this.admin.password, disabled: true},Validators.minLength(6)],
      presentation: [{value: this.admin.presentation, disabled: true}],
      photo: [{value: this.admin.photo, disabled: true}]
    })
  }

  enable(champ: string) {
    this.formBody.get(champ).enable();
    this.formBody.get(champ).setValue("");
  }

  onSubmit() {
    let admin = {...this.admin, ...this.formBody.value};
    if(!admin.password){admin.password = ""};
    this.adminService.updatedAdmin(admin).subscribe(admin => console.log(admin));
  }
}
