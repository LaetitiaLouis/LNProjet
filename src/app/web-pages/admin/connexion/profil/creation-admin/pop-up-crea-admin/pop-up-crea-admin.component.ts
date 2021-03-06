import {Component, Inject, OnInit} from '@angular/core';
import {Admin} from "../../../../../../model/admin";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

  /**
   * Crée un formulaire admin
   */
  public formCreaAdmin() {
    this.formBody = this.fb.group({
        prenom: ["", [Validators.required]],
        password: ["", [Validators.required ,Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
        presentation: ["", [Validators.required]],
        photo: ["", [Validators.required]],
        role: [{value: "ADMIN", disabled: false}],
        login:new FormControl("", {
          validators : [Validators.required],
          asyncValidators:[this.validator.loginExits()],
          updateOn:'blur'// requête faite quand quitte le champ uniquement
        }),
      },
      {
        validators: this.validator.passwordMatch
      });
  }

  /**
   * Crée un nouvel admin via un formulaire
   */
  public onSubmit() {
    this.adminService.registerAdmin(this.formBody.value)
      .subscribe(admin => {
          this.es.handleSuccess("Administrateur créé");
          this.router.navigate(['/profil']);
        }),
        _=>this.es.handleError("Le compte n'a pas été enregistré");
    this.dialogRef.close();
  }
}
