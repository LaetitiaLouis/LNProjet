import {Component, Inject, OnInit} from '@angular/core';
import {Admin} from "../../../../../../model/admin";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../../../../service/admin.service";
import {FormValidatorService} from "../../../../../../service/form-validator.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorService} from "../../../../../../service/error.service";

@Component({
  selector: 'app-pop-up-crea-admin',
  templateUrl: './pop-up-crea-admin.component.html',
  styleUrls: ['./pop-up-crea-admin.component.css']
})
export class PopUpCreaAdminComponent implements OnInit {
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

  public formCreaAdmin() {
    this.formBody = this.fb.group({
        prenom: ["", [Validators.required]],
        login: ["", [Validators.required]],
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
      .subscribe((admin => {
          this.es.handleSuccess("Administrateur créé");
          admin && this.router.navigate(['/profil']);
        }),
        this.es.handleError("Erreur"));
    this.dialogRef.close();
  }
}
