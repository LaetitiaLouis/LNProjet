import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Admin} from "../../../../model/admin";
import {JwtService} from "../../../../jwt/jwt.service";
import {AdminService} from "../../../../service/admin.service";
import {ErrorService} from "../../../../service/error.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-pop-up-modif-profil',
  templateUrl: './pop-up-modif-profil.component.html',
  styleUrls: ['./pop-up-modif-profil.component.css']
})
export class PopUpModifProfilComponent implements OnInit {
  public admin: Admin;
  public formBody: FormGroup;

  constructor(private jwtService: JwtService,
              private adminService: AdminService,
              private es: ErrorService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<PopUpModifProfilComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Admin) { }

  ngOnInit(): void {
    this.admin = this.jwtService.getAdmin();
    this.formBody = this.fb.group({
      prenom: [this.data.prenom],
      login: [this.data.login],
      password: [{value: this.data.password, disabled: true},Validators.minLength(6)],
      confirmPassword: ["", [Validators.required]],
      presentation: [{value: this.data.presentation, disabled: true}],
      photo: [{value: this.data.photo, disabled: true}]
    })
  }

  onSubmitUpdate() {
    let admin = {...this.admin, ...this.formBody.value};
    if(!admin.password){admin.password = ""};
    this.adminService.updatedAdmin(admin)
      .subscribe((admin => {
          this.es.handleSuccess("Profil modifié");
          console.log(admin);
        }),
        this.es.handleError("Erreur"))
    ;
  }

  enable(champ: string) {
    this.formBody.get(champ).enable();
    this.formBody.get(champ).setValue("");
  }

  closePopUp() {
    this.dialogRef.close();
  }
}
