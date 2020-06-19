import {Component, Inject, Input, OnInit} from '@angular/core';
import {Admin} from "../../../../../model/admin";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {JwtService} from "../../../../../security/jwt/jwt.service";
import {AdminService} from "../../../../../service/admin.service";
import {Router} from "@angular/router";
import {FormValidatorService} from "../../../../../service/form-validator.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorService} from "../../../../../service/error.service";
import {PopUpCreaAdminComponent} from "./pop-up-crea-admin/pop-up-crea-admin.component";

@Component({
  selector: 'app-creation-admin',
  templateUrl: './creation-admin.component.html',
  styleUrls: ['./creation-admin.component.css']
})
export class CreationAdminComponent implements OnInit {
  public admin: Admin;
  public formBody: FormGroup;


  constructor(private adminService: AdminService,
              private fb: FormBuilder,
              private validator: FormValidatorService,
              private router: Router,
              public dialogRef: MatDialogRef<PopUpCreaAdminComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private es: ErrorService) {
  }

  public ngOnInit(): void {
    this.formCreaAdmin();
  }

  public formCreaAdmin(): void {
    this.formBody = this.fb.group({
        prenom: ["", [Validators.required]],
        login: ["", [Validators.required],[this.validator.loginExits]],
        password: ["", [Validators.required]],
        // Validators.minLength(6)],
        confirmPassword: ["", [Validators.required]],
        presentation: ["", [Validators.required]],
        photo: ["", [Validators.required]],
        role: [{value: "ADMIN", disabled: false}]
      },
      {
        validators: this.validator.passwordMatch

      });
  }

  public onSubmit() {
    this.adminService.registerAdmin(this.formBody.value)
      .subscribe(admin => admin && this.router.navigate(['/profil']));
  }

  public closePopUp() {
    this.dialogRef.close();
  }
}
